import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { UserListItem } from "@/components/profile/UserListItem";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

interface FollowingPageProps {
  params: Promise<{ username: string }>;
}

export default async function FollowingPage({ params }: FollowingPageProps) {
  const { username } = await params;
  const currentUser = await getCurrentUser();

  const user = await db.user.findUnique({
    where: { username: username.toLowerCase() },
  });

  if (!user) notFound();

  const currentFollowingIds = currentUser
    ? (
        await db.follow.findMany({
          where: { followerId: currentUser.id },
          select: { followingId: true },
        })
      ).map((f) => f.followingId)
    : [];

  const following = await db.follow.findMany({
    where: { followerId: user.id },
    include: {
      following: {
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
    <AppShell headerTitle="Following">
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
        {following.length > 0 ? (
          following.map((f) => (
            <UserListItem
              key={f.following.id}
              user={{
                ...f.following,
                isFollowing: currentFollowingIds.includes(f.following.id),
              }}
              currentUser={currentUser}
            />
          ))
        ) : (
          <div className="p-8 text-center text-neutral-500 text-sm">
            @{user.username} isn&apos;t following anyone yet.
          </div>
        )}
      </div>
    </AppShell>
  );
}
