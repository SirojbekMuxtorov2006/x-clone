"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-md text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-red-950/40 border border-red-800/40 text-red-500 flex items-center justify-center mx-auto text-2xl font-bold">
          !
        </div>
        <h2 className="text-2xl font-black">Something went wrong!</h2>
        <p className="text-sm text-neutral-400">
          An unexpected error occurred while loading this page.
        </p>
        <div className="flex justify-center gap-3 pt-2">
          <Button
            onClick={() => reset()}
            variant="tweet"
            size="md"
            className="rounded-full px-6"
          >
            Try again
          </Button>
          <Button
            onClick={() => router.push("/")}
            variant="outline"
            size="md"
            className="rounded-full px-6"
          >
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}
