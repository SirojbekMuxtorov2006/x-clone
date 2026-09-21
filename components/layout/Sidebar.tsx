"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Search,
  Bell,
  Mail,
  Bookmark,
  User,
  Settings,
  Feather,
  LogOut,
  MoreHorizontal,
  Sparkles,
} from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { PostComposer } from "@/components/post/PostComposer";
import { logoutAction, demoLoginAction } from "@/actions/auth";
import { cn } from "@/lib/utils";

interface SidebarProps {
  currentUser: {
    id: string;
    name: string | null;
    username: string;
    image: string | null;
  } | null;
  unreadNotificationsCount?: number;
}

export function Sidebar({ currentUser, unreadNotificationsCount = 0 }: SidebarProps) {
  const pathname = usePathname();
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Explore", href: "/explore", icon: Search },
    {
      label: "Notifications",
      href: "/notifications",
      icon: Bell,
      badge: unreadNotificationsCount > 0 ? unreadNotificationsCount : null,
    },
    { label: "Messages", href: "/messages", icon: Mail },
    { label: "Bookmarks", href: "/bookmarks", icon: Bookmark },
    {
      label: "Profile",
      href: currentUser ? `/${currentUser.username}` : "/login",
      icon: User,
    },
    { label: "Settings", href: "/settings", icon: Settings },
  ];

  const demoAccounts = [
    { name: "Alex Rivera", username: "alex_dev" },
    { name: "Sarah Chen", username: "sarah_design" },
    { name: "Elena Rostova", username: "elena_ai" },
    { name: "Marcus Vance", username: "marcus_vance" },
    { name: "Demo User", username: "demo_user" },
  ];

  return (
    <header className="shrink-0 w-18 xl:w-68 z-30 select-none">
      <div className="fixed top-0 h-screen w-18 xl:w-68 flex flex-col justify-between py-2 px-2 xl:px-4 border-r border-[#2f3336]">
        {/* Top: Logo & Navigation */}
        <div className="flex flex-col items-center xl:items-start gap-1">
          {/* Brand Logo */}
          <Link
            href="/"
            className="p-3 rounded-full hover:bg-neutral-800 transition-colors w-fit flex items-center justify-center my-1 group"
            aria-label="X Clone Home"
          >
            <div className="w-8 h-8 flex items-center justify-center font-black text-2xl tracking-tighter text-white group-hover:scale-105 transition-transform">
              𝕏
            </div>
          </Link>

          {/* Nav links */}
          <nav className="flex flex-col gap-1 w-full" aria-label="Primary Navigation">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              const Icon = item.icon;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-4 p-3 rounded-full hover:bg-neutral-900 transition-colors w-full xl:w-fit group",
                    isActive ? "font-bold text-white" : "font-normal text-neutral-300"
                  )}
                >
                  <div className="relative">
                    <Icon
                      className={cn(
                        "w-6 h-6 transition-transform group-hover:scale-105",
                        isActive ? "stroke-[2.5px] text-white" : "text-neutral-300"
                      )}
                    />
                    {item.badge && (
                      <span className="absolute -top-1.5 -right-2 bg-[#1d9bf0] text-white text-[11px] font-bold px-1.5 py-0.2 rounded-full min-w-4 text-center ring-2 ring-black">
                        {item.badge > 99 ? "99+" : item.badge}
                      </span>
                    )}
                  </div>
                  <span className="hidden xl:inline text-lg">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Post button */}
          <div className="w-full mt-3">
            <Button
              onClick={() => setIsPostModalOpen(true)}
              variant="tweet"
              size="lg"
              className="hidden xl:flex text-base h-12 shadow-md hover:shadow-lg font-bold"
            >
              Post
            </Button>
            <button
              onClick={() => setIsPostModalOpen(true)}
              className="xl:hidden w-12 h-12 rounded-full bg-[#1d9bf0] text-white flex items-center justify-center hover:bg-[#1a8cd8] shadow-md transition-transform active:scale-95 mx-auto cursor-pointer"
              aria-label="Create Post"
            >
              <Feather className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Bottom: Current User Menu & Switcher */}
        {currentUser ? (
          <div className="relative w-full">
            {isUserMenuOpen && (
              <div className="absolute bottom-16 left-0 w-64 bg-black border border-[#2f3336] rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95">
                <div className="p-3 border-b border-[#2f3336]">
                  <p className="font-bold text-sm text-white truncate">{currentUser.name}</p>
                  <p className="text-xs text-neutral-400">@{currentUser.username}</p>
                </div>

                <div className="py-2 border-b border-[#2f3336]">
                  <p className="px-3 text-[11px] font-semibold text-[#1d9bf0] uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Quick Switch Account
                  </p>
                  {demoAccounts.map((acc) => (
                    <button
                      key={acc.username}
                      onClick={async () => {
                        setIsUserMenuOpen(false);
                        await demoLoginAction(acc.username);
                      }}
                      className={cn(
                        "w-full text-left px-3 py-1.5 text-xs rounded-lg hover:bg-neutral-800 transition-colors flex items-center justify-between cursor-pointer",
                        acc.username === currentUser.username
                          ? "text-[#1d9bf0] font-semibold"
                          : "text-neutral-300"
                      )}
                    >
                      <span className="truncate">{acc.name}</span>
                      <span className="text-[10px] text-neutral-500">@{acc.username}</span>
                    </button>
                  ))}
                </div>

                <Link
                  href={`/${currentUser.username}`}
                  onClick={() => setIsUserMenuOpen(false)}
                  className="flex items-center gap-2 w-full p-2.5 text-sm text-neutral-200 hover:bg-neutral-800 rounded-lg transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>View Profile</span>
                </Link>

                <button
                  onClick={() => logoutAction()}
                  className="flex items-center gap-2 w-full p-2.5 text-sm text-red-500 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log out @{currentUser.username}</span>
                </button>
              </div>
            )}

            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center justify-between w-full p-2 rounded-full hover:bg-neutral-900 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-2.5">
                <Avatar
                  src={currentUser.image}
                  name={currentUser.name}
                  alt={currentUser.username}
                  size="md"
                />
                <div className="hidden xl:flex flex-col text-left">
                  <span className="text-sm font-bold text-white truncate max-w-[120px]">
                    {currentUser.name}
                  </span>
                  <span className="text-xs text-neutral-400">@{currentUser.username}</span>
                </div>
              </div>
              <MoreHorizontal className="hidden xl:block w-5 h-5 text-neutral-400 group-hover:text-white" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-2 p-2">
            <Link href="/login">
              <Button variant="secondary" size="md" className="w-full">
                Log in
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Post Modal */}
      <Modal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
      >
        <PostComposer
          currentUser={currentUser}
          onSuccess={() => setIsPostModalOpen(false)}
          placeholder="What is happening?!"
          autoFocus
        />
      </Modal>
    </header>
  );
}
