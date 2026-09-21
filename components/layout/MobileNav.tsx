"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Bell, Mail, Feather } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { PostComposer } from "@/components/post/PostComposer";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  currentUser: {
    id: string;
    name: string | null;
    username: string;
    image: string | null;
  } | null;
  unreadNotificationsCount?: number;
}

export function MobileNav({ currentUser, unreadNotificationsCount = 0 }: MobileNavProps) {
  const pathname = usePathname();
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/explore", icon: Search, label: "Explore" },
    {
      href: "/notifications",
      icon: Bell,
      label: "Notifications",
      badge: unreadNotificationsCount > 0 ? unreadNotificationsCount : null,
    },
    { href: "/messages", icon: Mail, label: "Messages" },
  ];

  return (
    <>
      {/* Floating Action Button (FAB) for post creation */}
      {currentUser && (
        <button
          onClick={() => setIsPostModalOpen(true)}
          className="md:hidden fixed bottom-20 right-4 z-40 w-14 h-14 rounded-full bg-[#1d9bf0] text-white flex items-center justify-center shadow-lg hover:bg-[#1a8cd8] active:scale-95 transition-all cursor-pointer ring-2 ring-black"
          aria-label="Create Post"
        >
          <Feather className="w-6 h-6" />
        </button>
      )}

      {/* Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-md border-t border-[#2f3336] flex items-center justify-around py-3 px-2">
        {navItems.map((item) => {
          const isActive =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              className="relative p-2 text-neutral-400 hover:text-white transition-colors"
              aria-label={item.label}
            >
              <Icon className={cn("w-6 h-6", isActive && "text-white stroke-[2.5px]")} />
              {item.badge && (
                <span className="absolute top-1 right-1 bg-[#1d9bf0] text-white text-[10px] font-bold px-1 rounded-full min-w-3 text-center ring-2 ring-black">
                  {item.badge > 99 ? "99+" : item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Post Modal */}
      <Modal isOpen={isPostModalOpen} onClose={() => setIsPostModalOpen(false)}>
        <PostComposer
          currentUser={currentUser}
          onSuccess={() => setIsPostModalOpen(false)}
          placeholder="What is happening?!"
          autoFocus
        />
      </Modal>
    </>
  );
}
