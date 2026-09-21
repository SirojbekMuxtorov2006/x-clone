import { AppShell } from "@/components/layout/AppShell";
import { PostCard } from "@/components/post/PostCard";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import Link from "next/link";
import { Search, TrendingUp } from "lucide-react";
import { formatNumber } from "@/lib/utils";

export default async function ExplorePage() {
  const currentUser = await getCurrentUser();

  const trendingHashtagsRaw = await db.hashtag.findMany({
    take: 10,
    include: {
      _count: {
        select: { posts: true },
      },
    },
    orderBy: {
      posts: {
        _count: "desc",
      },
    },
  });

  const popularPosts = await db.post.findMany({
    take: 15,
    orderBy: {
      viewCount: "desc",
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

  const formattedPosts = popularPosts.map((p) => ({
    ...p,
    isLiked: Array.isArray(p.likes) && p.likes.length > 0,
    isReposted: Array.isArray(p.reposts) && p.reposts.length > 0,
    isBookmarked: Array.isArray(p.bookmarks) && p.bookmarks.length > 0,
  }));

  return (
    <AppShell headerTitle="Explore">
      {/* Search Bar Header */}
      <div className="sticky top-0 z-20 bg-black/80 backdrop-blur-md border-b border-[#2f3336] p-3">
        <form action="/search" method="GET">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              name="q"
              placeholder="Search X"
              className="w-full bg-[#16181c] border border-transparent focus:border-[#1d9bf0] focus:bg-black rounded-full pl-11 pr-4 py-2.5 text-sm text-white placeholder-neutral-500 outline-none transition-colors"
            />
          </div>
        </form>
      </div>

      {/* Trending Topics Grid */}
      <div className="p-4 border-b border-[#2f3336]">
        <h2 className="text-lg font-black text-white flex items-center gap-2 mb-3">
          <TrendingUp className="w-5 h-5 text-[#1d9bf0]" /> Trends for you
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {trendingHashtagsRaw.map((trend, idx) => (
            <Link
              key={trend.id}
              href={`/hashtag/${trend.name}`}
              className="p-3 rounded-2xl bg-neutral-900/40 border border-[#2f3336] hover:bg-neutral-800/40 transition-colors"
            >
              <span className="text-xs text-neutral-500">Trending · #{idx + 1}</span>
              <p className="font-bold text-base text-white hover:text-[#1d9bf0] transition-colors mt-0.5">
                #{trend.name}
              </p>
              <p className="text-xs text-neutral-500 mt-1">
                {formatNumber(trend._count.posts)} posts
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Posts */}
      <div className="divide-y divide-[#2f3336]">
        <div className="px-4 py-3 bg-neutral-950 font-bold text-sm text-neutral-400">
          Popular on X
        </div>
        {formattedPosts.map((post) => (
          <PostCard key={post.id} post={post} currentUser={currentUser} />
        ))}
      </div>
    </AppShell>
  );
}
