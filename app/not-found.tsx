import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <AppShell headerTitle="Page not found">
      <div className="p-12 text-center flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 rounded-full bg-neutral-900 border border-[#2f3336] flex items-center justify-center text-3xl font-black text-white mb-4">
          404
        </div>
        <h1 className="text-2xl font-black text-white mb-2">
          Hmm...this page doesn’t exist.
        </h1>
        <p className="text-sm text-neutral-500 max-w-sm mb-6">
          Try searching for something else, or return to your timeline.
        </p>
        <Link href="/">
          <Button variant="tweet" size="md" className="rounded-full font-bold px-6">
            Go to Home
          </Button>
        </Link>
      </div>
    </AppShell>
  );
}
