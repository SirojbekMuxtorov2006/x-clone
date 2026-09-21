"use client";

import React from "react";
import Link from "next/link";
import { Settings } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";

interface MobileHeaderProps {
  currentUser: {
    id: string;
    name: string | null;
    username: string;
    image: string | null;
  } | null;
  title?: string;
}

export function MobileHeader({ currentUser, title }: MobileHeaderProps) {
  return (
    <header className="md:hidden sticky top-0 z-30 bg-black/80 backdrop-blur-md border-b border-[#2f3336] px-4 py-2.5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {currentUser ? (
          <Link href={`/${currentUser.username}`}>
            <Avatar
              src={currentUser.image}
              name={currentUser.name}
              alt={currentUser.username}
              size="sm"
            />
          </Link>
        ) : (
          <div className="w-8" />
        )}
      </div>

      <div className="flex items-center">
        {title ? (
          <h1 className="text-base font-bold text-white">{title}</h1>
        ) : (
          <Link href="/" className="font-black text-xl text-white">
            𝕏
          </Link>
        )}
      </div>

      <div className="flex items-center">
        <Link
          href="/settings"
          className="p-1.5 text-neutral-400 hover:text-white rounded-full transition-colors"
          aria-label="Settings"
        >
          <Settings className="w-5 h-5" />
        </Link>
      </div>
    </header>
  );
}
