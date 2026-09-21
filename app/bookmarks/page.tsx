import { redirect } from "next/navigation";
import { Bookmark } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PostCard } from "@/components/post/PostCard";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function BookmarksPage() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect("/login");
  }

  const bookmarks = await db.bookmark.findMany({
    where: { userId: currentUser.id },
    orderBy: { createdAt: "desc" },
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
          likes: { where: { userId: currentUser.id } },
          reposts: { where: { userId: currentUser.id } },
          bookmarks: { where: { userId: currentUser.id } },
        },
      },
    },
  });

  const formattedPosts = bookmarks.map((b) => ({
    ...b.post,
    isLiked: b.post.likes.length > 0,
    isReposted: b.post.reposts.length > 0,
    isBookmarked: true,
  }));

  return (
    <AppShell headerTitle="Bookmarks">
      {/* Top Header */}
      <div className="sticky top-0 z-20 bg-black/80 backdrop-blur-md border-b border-[#2f3336] px-4 py-3">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-[#1d9bf0]" /> Bookmarks
        </h1>
        <p className="text-xs text-neutral-500">@{currentUser.username}</p>
      </div>

      {/* Bookmarks Timeline */}
      <div className="divide-y divide-[#2f3336]">
        {formattedPosts.length > 0 ? (
          formattedPosts.map((post) => (
            <PostCard key={post.id} post={post} currentUser={currentUser} />
          ))
        ) : (
          <div className="p-12 text-center text-neutral-500">
            <div className="w-14 h-14 rounded-full bg-neutral-900 border border-[#2f3336] flex items-center justify-center mx-auto mb-3">
              <Bookmark className="w-7 h-7 text-[#1d9bf0]" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">
              Save posts for later
            </h3>
            <p className="text-xs text-neutral-500 max-w-xs mx-auto">
              Don&apos;t let the good ones fly away! Bookmark posts to easily find them again in the future.
            </p>
          </div>
        )}
      </div>
    </AppShell>
  );
}
