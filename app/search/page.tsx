import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PostCard } from "@/components/post/PostCard";
import { UserListItem } from "@/components/profile/UserListItem";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";

interface SearchPageProps {
  searchParams: Promise<{ q?: string; f?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = "", f = "top" } = await searchParams;
  const currentUser = await getCurrentUser();

  const cleanQuery = q.trim();

  // Search posts and users
  let posts: React.ComponentProps<typeof PostCard>["post"][] = [];
  let users: React.ComponentProps<typeof UserListItem>["user"][] = [];

  if (cleanQuery) {
    const isTagSearch = cleanQuery.startsWith("#");
    const tag = isTagSearch ? cleanQuery.slice(1).toLowerCase() : cleanQuery.toLowerCase();

    // Query matching users
    if (f === "top" || f === "people") {
      const rawUsers = await db.user.findMany({
        where: {
          OR: [
            { username: { contains: tag, mode: "insensitive" } },
            { name: { contains: cleanQuery, mode: "insensitive" } },
          ],
        },
        take: 10,
        select: {
          id: true,
          name: true,
          username: true,
          image: true,
          bio: true,
        },
      });

      const currentFollowingIds = currentUser
        ? (
            await db.follow.findMany({
              where: { followerId: currentUser.id },
              select: { followingId: true },
            })
          ).map((follow) => follow.followingId)
        : [];

      users = rawUsers.map((u) => ({
        ...u,
        isFollowing: currentFollowingIds.includes(u.id),
      }));
    }

    // Query matching posts
    if (f !== "people") {
      const postWhere = {
        OR: [
          { content: { contains: cleanQuery, mode: "insensitive" as const } },
          { hashtags: { some: { hashtag: { name: tag } } } },
        ],
        ...(f === "media" ? { media: { some: {} } } : {}),
      };

      const rawPosts = await db.post.findMany({
        where: postWhere,
        take: 20,
        orderBy: f === "latest" ? { createdAt: "desc" } : { viewCount: "desc" },
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

      posts = rawPosts.map((p) => ({
        ...p,
        isLiked: Array.isArray(p.likes) && p.likes.length > 0,
        isReposted: Array.isArray(p.reposts) && p.reposts.length > 0,
        isBookmarked: Array.isArray(p.bookmarks) && p.bookmarks.length > 0,
      }));
    }
  }

  const tabs = [
    { label: "Top", value: "top" },
    { label: "Latest", value: "latest" },
    { label: "People", value: "people" },
    { label: "Media", value: "media" },
  ];

  return (
    <AppShell headerTitle={`Search: ${cleanQuery}`}>
      {/* Search Header Bar */}
      <div className="sticky top-0 z-20 bg-black/80 backdrop-blur-md border-b border-[#2f3336]">
        <div className="p-3 flex items-center gap-3">
          <Link
            href="/explore"
            className="p-2 rounded-full hover:bg-neutral-800 text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>

          <form action="/search" method="GET" className="flex-1">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                name="q"
                defaultValue={cleanQuery}
                placeholder="Search"
                className="w-full bg-[#16181c] border border-transparent focus:border-[#1d9bf0] focus:bg-black rounded-full pl-11 pr-4 py-2 text-sm text-white placeholder-neutral-500 outline-none"
              />
            </div>
          </form>
        </div>

        {/* Filter Tabs */}
        <div className="flex border-t border-[#2f3336]/60">
          {tabs.map((tab) => (
            <Link
              key={tab.value}
              href={`/search?q=${encodeURIComponent(cleanQuery)}&f=${tab.value}`}
              className="flex-1 hover:bg-neutral-900/50 py-3 flex flex-col items-center justify-center transition-colors relative"
            >
              <span
                className={cn(
                  "text-sm font-bold",
                  f === tab.value ? "text-white" : "text-neutral-500"
                )}
              >
                {tab.label}
              </span>
              {f === tab.value && (
                <div className="absolute bottom-0 h-1 w-12 bg-[#1d9bf0] rounded-full" />
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* People Results */}
      {users.length > 0 && (
        <div className="border-b border-[#2f3336]">
          <div className="p-3 font-bold text-sm text-neutral-400">People</div>
          <div className="divide-y divide-[#2f3336]/60">
            {users.map((user) => (
              <UserListItem key={user.id} user={user} currentUser={currentUser} />
            ))}
          </div>
        </div>
      )}

      {/* Posts Results */}
      {posts.length > 0 && (
        <div className="divide-y divide-[#2f3336]">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} currentUser={currentUser} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {cleanQuery && posts.length === 0 && users.length === 0 && (
        <div className="p-12 text-center text-neutral-500">
          <p className="text-xl font-bold text-white mb-1">
            No results for &quot;{cleanQuery}&quot;
          </p>
          <p className="text-sm">
            Try searching for something else, or check your spelling.
          </p>
        </div>
      )}
    </AppShell>
  );
}
