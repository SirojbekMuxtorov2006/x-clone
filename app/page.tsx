import { AppShell } from "@/components/layout/AppShell";
import { PostFeed } from "@/components/feed/PostFeed";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function HomePage() {
  const currentUser = await getCurrentUser();

  // Fetch "For You" posts (recent top posts)
  const rawForYou = await db.post.findMany({
    where: {
      replyToId: null, // top-level posts
    },
    take: 20,
    orderBy: {
      createdAt: "desc",
    },
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

  const forYouPosts = rawForYou.map((post) => ({
    ...post,
    isLiked: Array.isArray(post.likes) && post.likes.length > 0,
    isReposted: Array.isArray(post.reposts) && post.reposts.length > 0,
    isBookmarked: Array.isArray(post.bookmarks) && post.bookmarks.length > 0,
  }));

  // Fetch "Following" posts
  let followingPosts: typeof forYouPosts = [];
  if (currentUser) {
    const followingIds = (
      await db.follow.findMany({
        where: { followerId: currentUser.id },
        select: { followingId: true },
      })
    ).map((f) => f.followingId);

    const rawFollowing = await db.post.findMany({
      where: {
        authorId: { in: followingIds },
        replyToId: null,
      },
      take: 20,
      orderBy: {
        createdAt: "desc",
      },
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
        likes: { where: { userId: currentUser.id } },
        reposts: { where: { userId: currentUser.id } },
        bookmarks: { where: { userId: currentUser.id } },
      },
    });

    followingPosts = rawFollowing.map((post) => ({
      ...post,
      isLiked: post.likes.length > 0,
      isReposted: post.reposts.length > 0,
      isBookmarked: post.bookmarks.length > 0,
    }));
  }

  return (
    <AppShell>
      <PostFeed
        initialForYouPosts={forYouPosts}
        initialFollowingPosts={followingPosts}
        currentUser={currentUser}
      />
    </AppShell>
  );
}
