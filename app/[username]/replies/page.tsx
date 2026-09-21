import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileTabs } from "@/components/profile/ProfileTabs";
import { PostCard } from "@/components/post/PostCard";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

interface ProfileRepliesPageProps {
  params: Promise<{ username: string }>;
}

export default async function ProfileRepliesPage({ params }: ProfileRepliesPageProps) {
  const { username } = await params;
  const currentUser = await getCurrentUser();

  const user = await db.user.findUnique({
    where: { username: username.toLowerCase() },
    include: {
      _count: {
        select: {
          posts: true,
          followers: true,
          following: true,
        },
      },
    },
  });

  if (!user) notFound();

  let isFollowing = false;
  if (currentUser && currentUser.id !== user.id) {
    const followRecord = await db.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: currentUser.id,
          followingId: user.id,
        },
      },
    });
    isFollowing = !!followRecord;
  }

  const replies = await db.post.findMany({
    where: {
      authorId: user.id,
      replyToId: { not: null },
    },
    orderBy: { createdAt: "desc" },
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

  const formattedReplies = replies.map((post) => ({
    ...post,
    isLiked: Array.isArray(post.likes) && post.likes.length > 0,
    isReposted: Array.isArray(post.reposts) && post.reposts.length > 0,
    isBookmarked: Array.isArray(post.bookmarks) && post.bookmarks.length > 0,
  }));

  return (
    <AppShell headerTitle={user.name || `@${user.username}`}>
      <ProfileHeader
        user={user}
        currentUser={currentUser}
        initialIsFollowing={isFollowing}
      />
      <ProfileTabs username={user.username} />

      <div className="divide-y divide-[#2f3336]">
        {formattedReplies.length > 0 ? (
          formattedReplies.map((post) => (
            <PostCard key={post.id} post={post} currentUser={currentUser} />
          ))
        ) : (
          <div className="p-8 text-center text-neutral-500 text-sm">
            @{user.username} hasn&apos;t replied to any posts yet.
          </div>
        )}
      </div>
    </AppShell>
  );
}
