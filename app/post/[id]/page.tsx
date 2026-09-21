import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PostCard } from "@/components/post/PostCard";
import { PostComposer } from "@/components/post/PostComposer";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { incrementViewCountAction } from "@/actions/post";

interface PostPageProps {
  params: Promise<{ id: string }>;
}

export default async function PostDetailPage({ params }: PostPageProps) {
  const { id } = await params;
  const currentUser = await getCurrentUser();

  // Increment view count in background
  incrementViewCountAction(id);

  // Fetch post with author, media, quote, and parent post
  const post = await db.post.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          username: true,
          image: true,
        },
      },
      media: true,
      quoteOf: {
        include: {
          author: {
            select: {
              name: true,
              username: true,
              image: true,
            },
          },
        },
      },
      replyTo: {
        include: {
          author: {
            select: {
              id: true,
              name: true,
              username: true,
              image: true,
            },
          },
          media: true,
          _count: {
            select: {
              likes: true,
              reposts: true,
              replies: true,
            },
          },
          likes: currentUser ? { where: { userId: currentUser.id } } : false,
          reposts: currentUser ? { where: { userId: currentUser.id } } : false,
          bookmarks: currentUser ? { where: { userId: currentUser.id } } : false,
        },
      },
      replies: {
        orderBy: { createdAt: "asc" },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              username: true,
              image: true,
            },
          },
          media: true,
          _count: {
            select: {
              likes: true,
              reposts: true,
              replies: true,
            },
          },
          likes: currentUser ? { where: { userId: currentUser.id } } : false,
          reposts: currentUser ? { where: { userId: currentUser.id } } : false,
          bookmarks: currentUser ? { where: { userId: currentUser.id } } : false,
        },
      },
      _count: {
        select: {
          likes: true,
          reposts: true,
          replies: true,
        },
      },
      likes: currentUser ? { where: { userId: currentUser.id } } : false,
      reposts: currentUser ? { where: { userId: currentUser.id } } : false,
      bookmarks: currentUser ? { where: { userId: currentUser.id } } : false,
    },
  });

  if (!post) {
    notFound();
  }

  const formattedPost = {
    ...post,
    isLiked: Array.isArray(post.likes) && post.likes.length > 0,
    isReposted: Array.isArray(post.reposts) && post.reposts.length > 0,
    isBookmarked: Array.isArray(post.bookmarks) && post.bookmarks.length > 0,
  };

  const formattedParent = post.replyTo
    ? {
        ...post.replyTo,
        isLiked: Array.isArray(post.replyTo.likes) && post.replyTo.likes.length > 0,
        isReposted: Array.isArray(post.replyTo.reposts) && post.replyTo.reposts.length > 0,
        isBookmarked: Array.isArray(post.replyTo.bookmarks) && post.replyTo.bookmarks.length > 0,
      }
    : null;

  const formattedReplies = post.replies.map((r) => ({
    ...r,
    isLiked: Array.isArray(r.likes) && r.likes.length > 0,
    isReposted: Array.isArray(r.reposts) && r.reposts.length > 0,
    isBookmarked: Array.isArray(r.bookmarks) && r.bookmarks.length > 0,
  }));

  return (
    <AppShell headerTitle="Post">
      {/* Top Header */}
      <div className="sticky top-0 z-20 bg-black/80 backdrop-blur-md border-b border-[#2f3336] px-4 py-3 flex items-center gap-6">
        <Link
          href="/"
          className="p-2 rounded-full hover:bg-neutral-800 transition-colors text-white"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl font-bold text-white">Post</h1>
      </div>

      {/* Parent Post Context (if this is a reply) */}
      {formattedParent && (
        <div className="border-b border-[#2f3336]">
          <PostCard post={formattedParent} currentUser={currentUser} />
        </div>
      )}

      {/* Main Post Detail */}
      <div className="border-b border-[#2f3336]">
        <PostCard post={formattedPost} currentUser={currentUser} isDetailView />
      </div>

      {/* Reply Composer */}
      {currentUser ? (
        <PostComposer
          currentUser={currentUser}
          replyToId={post.id}
          placeholder="Post your reply"
        />
      ) : (
        <div className="p-4 border-b border-[#2f3336] text-center text-sm text-neutral-500">
          <Link href="/login" className="text-[#1d9bf0] font-bold hover:underline">
            Log in
          </Link>{" "}
          to reply to this conversation.
        </div>
      )}

      {/* Threaded Replies List */}
      <div>
        {formattedReplies.length > 0 ? (
          <div className="divide-y divide-[#2f3336]">
            {formattedReplies.map((reply) => (
              <PostCard key={reply.id} post={reply} currentUser={currentUser} />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-neutral-500 text-sm">
            No replies yet. Be the first to start the thread!
          </div>
        )}
      </div>
    </AppShell>
  );
}
