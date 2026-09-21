"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface FeedTabsProps {
  activeTab: "for-you" | "following";
  onTabChange: (tab: "for-you" | "following") => void;
}

export function FeedTabs({ activeTab, onTabChange }: FeedTabsProps) {
  return (
    <div className="sticky top-0 z-20 bg-black/80 backdrop-blur-md border-b border-[#2f3336] flex">
      {/* For you */}
      <button
        onClick={() => onTabChange("for-you")}
        className="flex-1 hover:bg-neutral-900/50 py-3.5 flex flex-col items-center justify-center transition-colors cursor-pointer relative"
      >
        <span
          className={cn(
            "text-sm font-bold transition-colors",
            activeTab === "for-you" ? "text-white" : "text-neutral-500"
          )}
        >
          For you
        </span>
        {activeTab === "for-you" && (
          <div className="absolute bottom-0 h-1 w-14 bg-[#1d9bf0] rounded-full" />
        )}
      </button>

      {/* Following */}
      <button
        onClick={() => onTabChange("following")}
        className="flex-1 hover:bg-neutral-900/50 py-3.5 flex flex-col items-center justify-center transition-colors cursor-pointer relative"
      >
        <span
          className={cn(
            "text-sm font-bold transition-colors",
            activeTab === "following" ? "text-white" : "text-neutral-500"
          )}
        >
          Following
        </span>
        {activeTab === "following" && (
          <div className="absolute bottom-0 h-1 w-16 bg-[#1d9bf0] rounded-full" />
        )}
      </button>
    </div>
  );
}
