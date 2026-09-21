import React from "react";
import { Sidebar } from "./Sidebar";
import { RightSidebar } from "./RightSidebar";
import { MobileNav } from "./MobileNav";
import { MobileHeader } from "./MobileHeader";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

interface AppShellProps {
  children: React.ReactNode;
  headerTitle?: string;
  hideRightSidebar?: boolean;
}

export async function AppShell({
  children,
  headerTitle,
  hideRightSidebar = false,
}: AppShellProps) {
  const currentUser = await getCurrentUser();

  // Get unread notification count
  const unreadNotificationsCount = currentUser
    ? await db.notification.count({
        where: { recipientId: currentUser.id, isRead: false },
      })
    : 0;

  // Get trending hashtags with post count
  const trendingHashtagsRaw = await db.hashtag.findMany({
    take: 6,
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

  const trendingHashtags = trendingHashtagsRaw.map((t) => ({
    name: t.name,
    count: t._count.posts,
  }));

  // Get suggested users to follow
  let suggestedUsers: Array<{
    id: string;
    name: string | null;
    username: string;
    image: string | null;
    bio: string | null;
    isFollowing: boolean;
  }> = [];

  if (currentUser) {
    const followingIds = (
      await db.follow.findMany({
        where: { followerId: currentUser.id },
        select: { followingId: true },
      })
    ).map((f) => f.followingId);

    const candidates = await db.user.findMany({
      where: {
        id: {
          notIn: [currentUser.id, ...followingIds],
        },
      },
      take: 4,
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
        bio: true,
      },
    });

    suggestedUsers = candidates.map((u) => ({
      ...u,
      isFollowing: false,
    }));
  } else {
    const topUsers = await db.user.findMany({
      take: 4,
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
        bio: true,
      },
    });

    suggestedUsers = topUsers.map((u) => ({
      ...u,
      isFollowing: false,
    }));
  }

  return (
    <div className="min-h-screen bg-black text-[#e7e9ea] flex justify-center">
      {/* 3-Column Shell Container */}
      <div className="flex w-full max-w-[1300px] justify-between">
        {/* Left Column: Sidebar (Desktop/Tablet) */}
        <Sidebar
          currentUser={currentUser}
          unreadNotificationsCount={unreadNotificationsCount}
        />

        {/* Center Column: Main Content */}
        <main className="flex-1 min-w-0 max-w-[620px] min-h-screen border-r border-[#2f3336] pb-20 md:pb-6">
          <MobileHeader currentUser={currentUser} title={headerTitle} />
          {children}
        </main>

        {/* Right Column: Search, Trending, Suggestions */}
        {!hideRightSidebar && (
          <RightSidebar
            trendingHashtags={trendingHashtags}
            suggestedUsers={suggestedUsers}
          />
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav
        currentUser={currentUser}
        unreadNotificationsCount={unreadNotificationsCount}
      />
    </div>
  );
}
