import { PostSkeleton } from "@/components/ui/Skeleton";
import { AppShell } from "@/components/layout/AppShell";

export default function Loading() {
  return (
    <AppShell>
      <div className="divide-y divide-[#2f3336]">
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </div>
    </AppShell>
  );
}
