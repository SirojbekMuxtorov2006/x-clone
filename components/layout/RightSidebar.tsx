"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, TrendingUp, Sparkles } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { toggleFollowAction } from "@/actions/user";
import { formatNumber } from "@/lib/utils";

interface RightSidebarProps {
  trendingHashtags: Array<{ name: string; count: number }>;
  suggestedUsers: Array<{
    id: string;
    name: string | null;
    username: string;
    image: string | null;
    bio: string | null;
    isFollowing: boolean;
  }>;
}

export function RightSidebar({
  trendingHashtags,
  suggestedUsers,
}: RightSidebarProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [followOverrides, setFollowOverrides] = useState<Record<string, boolean>>({});
  const [loadingUserIds, setLoadingUserIds] = useState<Record<string, boolean>>({});

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleFollow = async (userId: string) => {
    setLoadingUserIds((prev) => ({ ...prev, [userId]: true }));
    try {
      const res = await toggleFollowAction(userId);
      if (res.success) {
        setFollowOverrides((prev) => ({ ...prev, [userId]: !!res.isFollowing }));
      }
    } finally {
      setLoadingUserIds((prev) => ({ ...prev, [userId]: false }));
    }
  };

  return (
    <aside className="hidden lg:flex flex-col gap-4 w-72 xl:w-88 shrink-0 px-4 py-3 select-none">
      {/* Sticky Search bar */}
      <form onSubmit={handleSearch} className="sticky top-0 z-20 bg-black/80 backdrop-blur-md pb-1">
        <div className="relative flex items-center">
          <Search className="absolute left-4 w-4 h-4 text-neutral-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="w-full bg-[#16181c] border border-transparent focus:border-[#1d9bf0] focus:bg-black rounded-full pl-11 pr-4 py-2.5 text-sm text-white placeholder-neutral-500 outline-none transition-all"
          />
        </div>
      </form>

      {/* Trending / What's Happening */}
      <div className="bg-[#16181c] border border-[#2f3336] rounded-2xl overflow-hidden">
        <div className="p-3.5 border-b border-[#2f3336] flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-1.5">
            <TrendingUp className="w-5 h-5 text-[#1d9bf0]" /> What&apos;s happening
          </h2>
        </div>

        <div className="divide-y divide-[#2f3336]/40">
          {trendingHashtags.length > 0 ? (
            trendingHashtags.slice(0, 5).map((trend, idx) => (
              <Link
                key={trend.name}
                href={`/hashtag/${trend.name}`}
                className="block p-3.5 hover:bg-neutral-800/40 transition-colors group"
              >
                <div className="flex items-center justify-between text-xs text-neutral-500">
                  <span>Trending in Tech · #{idx + 1}</span>
                </div>
                <p className="font-bold text-sm text-[#e7e9ea] group-hover:text-[#1d9bf0] transition-colors mt-0.5">
                  #{trend.name}
                </p>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {formatNumber(trend.count)} {trend.count === 1 ? "post" : "posts"}
                </p>
              </Link>
            ))
          ) : (
            <div className="p-4 text-xs text-neutral-500">No trending topics right now.</div>
          )}
        </div>
      </div>

      {/* Who to follow */}
      {suggestedUsers.length > 0 && (
        <div className="bg-[#16181c] border border-[#2f3336] rounded-2xl overflow-hidden">
          <div className="p-3.5 border-b border-[#2f3336]">
            <h2 className="text-lg font-bold text-white flex items-center gap-1.5">
              <Sparkles className="w-5 h-5 text-[#1d9bf0]" /> Who to follow
            </h2>
          </div>

          <div className="divide-y divide-[#2f3336]/40">
            {suggestedUsers.slice(0, 4).map((user) => {
              const isFollowing =
                followOverrides[user.id] !== undefined
                  ? followOverrides[user.id]
                  : user.isFollowing;

              return (
                <div
                  key={user.id}
                  className="p-3.5 flex items-center justify-between hover:bg-neutral-800/40 transition-colors"
                >
                  <Link
                    href={`/${user.username}`}
                    className="flex items-center gap-2.5 min-w-0 group"
                  >
                    <Avatar src={user.image} name={user.name} alt={user.username} size="md" />
                    <div className="min-w-0">
                      <p className="font-bold text-sm text-white truncate group-hover:underline">
                        {user.name}
                      </p>
                      <p className="text-xs text-neutral-500 truncate">@{user.username}</p>
                    </div>
                  </Link>

                  <Button
                    onClick={() => handleFollow(user.id)}
                    loading={loadingUserIds[user.id]}
                    variant={isFollowing ? "outline" : "secondary"}
                    size="sm"
                    className="rounded-full font-bold px-3.5 h-8 shrink-0 text-xs ml-2"
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Footer links */}
      <footer className="px-2 text-xs text-neutral-500 flex flex-wrap gap-x-3 gap-y-1">
        <Link href="/terms" className="hover:underline">Terms of Service</Link>
        <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
        <Link href="/cookies" className="hover:underline">Cookie Policy</Link>
        <Link href="/settings" className="hover:underline">Accessibility</Link>
        <span>© 2026 X Corp Clone</span>
      </footer>
    </aside>
  );
}
