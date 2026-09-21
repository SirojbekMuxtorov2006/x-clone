"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface ProfileTabsProps {
  username: string;
}

export function ProfileTabs({ username }: ProfileTabsProps) {
  const pathname = usePathname();

  const tabs = [
    { label: "Posts", href: `/${username}` },
    { label: "Replies", href: `/${username}/replies` },
    { label: "Media", href: `/${username}/media` },
    { label: "Likes", href: `/${username}/likes` },
  ];

  return (
    <div className="flex border-b border-[#2f3336] bg-black">
      {tabs.map((tab) => {
        const isActive =
          tab.label === "Posts"
            ? pathname === `/${username}`
            : pathname === tab.href;

        return (
          <Link
            key={tab.label}
            href={tab.href}
            className="flex-1 hover:bg-neutral-900/50 py-3.5 flex flex-col items-center justify-center transition-colors relative"
          >
            <span
              className={cn(
                "text-sm font-bold transition-colors",
                isActive ? "text-white" : "text-neutral-500"
              )}
            >
              {tab.label}
            </span>
            {isActive && (
              <div className="absolute bottom-0 h-1 w-12 bg-[#1d9bf0] rounded-full" />
            )}
          </Link>
        );
      })}
    </div>
  );
}
