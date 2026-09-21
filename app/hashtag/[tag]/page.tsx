import Link from "next/link";
import { ArrowLeft, Hash } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PostCard } from "@/components/post/PostCard";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { formatNumber } from "@/lib/utils";

interface HashtagPageProps {
  params: Promise<{ tag: string }>;
}

export default async function HashtagPage({ params }: HashtagPageProps) {
  const { tag } = await params;
  const cleanTag = decodeURIComponent(tag).toLowerCase().replace(/^#/, "");
  const currentUser = await getCurrentUser();

  const hashtag = await db.hashtag.findUnique({
    where: { name: cleanTag },
    include: {
      _count: {
        select: { posts: true },
      },
      posts: {
        take: 30,
        orderBy: {
          post: {
            createdAt: "desc",
          },
        },
        include: {
          post: {
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
          },
        },
      },
    },
  });

  const formattedPosts =
    hashtag?.posts.map((item) => ({
      ...item.post,
      isLiked: Array.isArray(item.post.likes) && item.post.likes.length > 0,
      isReposted: Array.isArray(item.post.reposts) && item.post.reposts.length > 0,
      isBookmarked: Array.isArray(item.post.bookmarks) && item.post.bookmarks.length > 0,
    })) || [];

  return (
    <AppShell headerTitle={`#${cleanTag}`}>
      {/* Header */}
      <div className="sticky top-0 z-20 bg-black/80 backdrop-blur-md border-b border-[#2f3336] px-4 py-2 flex items-center gap-6">
        <Link
          href="/"
          className="p-2 rounded-full hover:bg-neutral-800 text-white"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-lg font-bold text-white flex items-center gap-1">
            <Hash className="w-4 h-4 text-[#1d9bf0]" />
            {cleanTag}
          </h1>
          <p className="text-xs text-neutral-500">
            {formatNumber(hashtag?._count.posts || 0)} posts
          </p>
        </div>
      </div>

      {/* Posts */}
      <div className="divide-y divide-[#2f3336]">
        {formattedPosts.length > 0 ? (
          formattedPosts.map((post) => (
            <PostCard key={post.id} post={post} currentUser={currentUser} />
          ))
        ) : (
          <div className="p-8 text-center text-neutral-500 text-sm">
            No posts found with #{cleanTag} yet.
          </div>
        )}
      </div>
    </AppShell>
  );
}
