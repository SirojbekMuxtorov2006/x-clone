"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { postSchema } from "@/lib/validations";
import { extractHashtags, extractMentions } from "@/lib/utils";
import { rateLimit } from "@/lib/rate-limit";

export async function createPostAction(data: {
  content: string;
  replyToId?: string;
  quoteOfId?: string;
  media?: Array<{ url: string; type: "image" | "gif" | "video" }>;
}) {
  const user = await getCurrentUser();
  if (!user) {
    return { error: "You must be logged in to post." };
  }

  const rateCheck = rateLimit(`post:${user.id}`, { limit: 20, windowMs: 60 * 1000 });
  if (!rateCheck.success) {
    return { error: `Posting too fast. Please wait ${rateCheck.reset} seconds.` };
  }

  const parsed = postSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message || "Invalid post data" };
  }

  const { content, replyToId, quoteOfId, media } = parsed.data;

  // Create post in database
  const post = await db.post.create({
    data: {
      content,
      authorId: user.id,
      replyToId: replyToId || null,
      quoteOfId: quoteOfId || null,
      media: media && media.length > 0
        ? {
            create: media.map((item, index) => ({
              url: item.url,
              type: item.type,
              order: index,
            })),
          }
        : undefined,
    },
    include: {
      author: true,
      media: true,
    },
  });

  // Extract hashtags & link them
  const hashtags = extractHashtags(content);
  for (const tag of hashtags) {
    const hashtag = await db.hashtag.upsert({
      where: { name: tag },
      create: { name: tag },
      update: {},
    });
    await db.postHashtag.create({
      data: {
        postId: post.id,
        hashtagId: hashtag.id,
      },
    });
  }

  // If this is a reply, notify author of parent post
  if (replyToId) {
    const parentPost = await db.post.findUnique({
      where: { id: replyToId },
      select: { authorId: true },
    });
    if (parentPost && parentPost.authorId !== user.id) {
      await db.notification.create({
        data: {
          type: "REPLY",
          recipientId: parentPost.authorId,
          issuerId: user.id,
          postId: post.id,
        },
      });
    }
  }

  // If this is a quote, notify quoted post author
  if (quoteOfId) {
    const quotedPost = await db.post.findUnique({
      where: { id: quoteOfId },
      select: { authorId: true },
    });
    if (quotedPost && quotedPost.authorId !== user.id) {
      await db.notification.create({
        data: {
          type: "QUOTE",
          recipientId: quotedPost.authorId,
          issuerId: user.id,
          postId: post.id,
        },
      });
    }
  }

  // Extract mentions and notify mentioned users
  const mentions = extractMentions(content);
  for (const mentionHandle of mentions) {
    const mentionedUser = await db.user.findUnique({
      where: { username: mentionHandle },
      select: { id: true },
    });
    if (mentionedUser && mentionedUser.id !== user.id) {
      await db.notification.create({
        data: {
          type: "MENTION",
          recipientId: mentionedUser.id,
          issuerId: user.id,
          postId: post.id,
        },
      });
    }
  }

  revalidatePath("/");
  if (replyToId) revalidatePath(`/post/${replyToId}`);
  revalidatePath(`/${user.username}`);

  return { success: true, post };
}

export async function deletePostAction(postId: string) {
  const user = await getCurrentUser();
  if (!user) {
    return { error: "Unauthorized." };
  }

  const post = await db.post.findUnique({
    where: { id: postId },
    select: { authorId: true, replyToId: true },
  });

  if (!post) {
    return { error: "Post not found." };
  }

  if (post.authorId !== user.id) {
    return { error: "You can only delete your own posts." };
  }

  await db.post.delete({
    where: { id: postId },
  });

  revalidatePath("/");
  if (post.replyToId) revalidatePath(`/post/${post.replyToId}`);
  revalidatePath(`/${user.username}`);

  return { success: true };
}

export async function toggleLikeAction(postId: string) {
  const user = await getCurrentUser();
  if (!user) {
    return { error: "You must be logged in to like posts." };
  }

  const existingLike = await db.like.findUnique({
    where: {
      userId_postId: {
        userId: user.id,
        postId,
      },
    },
  });

  if (existingLike) {
    await db.like.delete({
      where: { id: existingLike.id },
    });

    return { success: true, isLiked: false };
  } else {
    await db.like.create({
      data: {
        userId: user.id,
        postId,
      },
    });

    const targetPost = await db.post.findUnique({
      where: { id: postId },
      select: { authorId: true },
    });

    if (targetPost && targetPost.authorId !== user.id) {
      await db.notification.create({
        data: {
          type: "LIKE",
          recipientId: targetPost.authorId,
          issuerId: user.id,
          postId,
        },
      });
    }

    return { success: true, isLiked: true };
  }
}

export async function toggleRepostAction(postId: string) {
  const user = await getCurrentUser();
  if (!user) {
    return { error: "You must be logged in to repost." };
  }

  const existingRepost = await db.repost.findUnique({
    where: {
      userId_postId: {
        userId: user.id,
        postId,
      },
    },
  });

  if (existingRepost) {
    await db.repost.delete({
      where: { id: existingRepost.id },
    });

    return { success: true, isReposted: false };
  } else {
    await db.repost.create({
      data: {
        userId: user.id,
        postId,
      },
    });

    const targetPost = await db.post.findUnique({
      where: { id: postId },
      select: { authorId: true },
    });

    if (targetPost && targetPost.authorId !== user.id) {
      await db.notification.create({
        data: {
          type: "REPOST",
          recipientId: targetPost.authorId,
          issuerId: user.id,
          postId,
        },
      });
    }

    return { success: true, isReposted: true };
  }
}

export async function toggleBookmarkAction(postId: string) {
  const user = await getCurrentUser();
  if (!user) {
    return { error: "You must be logged in to bookmark." };
  }

  const existingBookmark = await db.bookmark.findUnique({
    where: {
      userId_postId: {
        userId: user.id,
        postId,
      },
    },
  });

  if (existingBookmark) {
    await db.bookmark.delete({
      where: { id: existingBookmark.id },
    });

    revalidatePath("/bookmarks");
    return { success: true, isBookmarked: false };
  } else {
    await db.bookmark.create({
      data: {
        userId: user.id,
        postId,
      },
    });

    revalidatePath("/bookmarks");
    return { success: true, isBookmarked: true };
  }
}

export async function incrementViewCountAction(postId: string) {
  try {
    await db.post.update({
      where: { id: postId },
      data: { viewCount: { increment: 1 } },
    });
  } catch {
    // Non-critical background count
  }
}
