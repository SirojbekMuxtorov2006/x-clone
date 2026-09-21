import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { UserListItem } from "@/components/profile/UserListItem";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

interface FollowersPageProps {
  params: Promise<{ username: string }>;
}

export default async function FollowersPage({ params }: FollowersPageProps) {
  const { username } = await params;
  const currentUser = await getCurrentUser();

  const user = await db.user.findUnique({
    where: { username: username.toLowerCase() },
  });

  if (!user) notFound();

  // Get current user's following list to show follow status
  const currentFollowingIds = currentUser
    ? (
        await db.follow.findMany({
          where: { followerId: currentUser.id },
          select: { followingId: true },
        })
      ).map((f) => f.followingId)
    : [];

  const followers = await db.follow.findMany({
    where: { followingId: user.id },
    include: {
      follower: {
        select: {
          id: true,
          name: true,
          username: true,
          image: true,
          bio: true,
        },
      },
    },
  });

  return (
    <AppShell headerTitle="Followers">
      <div className="sticky top-0 z-20 bg-black/80 backdrop-blur-md border-b border-[#2f3336] px-4 py-2 flex items-center gap-6">
        <Link
          href={`/${user.username}`}
          className="p-2 rounded-full hover:bg-neutral-800 text-white"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-lg font-bold text-white">{user.name}</h1>
          <p className="text-xs text-neutral-500">@{user.username}</p>
        </div>
      </div>

      <div className="divide-y divide-[#2f3336]">
        {followers.length > 0 ? (
          followers.map((f) => (
            <UserListItem
              key={f.follower.id}
              user={{
                ...f.follower,
                isFollowing: currentFollowingIds.includes(f.follower.id),
              }}
              currentUser={currentUser}
            />
          ))
        ) : (
          <div className="p-8 text-center text-neutral-500 text-sm">
            @{user.username} doesn&apos;t have any followers yet.
          </div>
        )}
      </div>
    </AppShell>
  );
}
