"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { loginAction, demoLoginAction } from "@/actions/auth";
import { Avatar } from "@/components/ui/Avatar";

export default function LoginPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const demoUsers = [
    {
      name: "Alex Rivera",
      username: "alex_dev",
      role: "Staff Engineer · Next.js & Rust",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    },
    {
      name: "Sarah Chen",
      username: "sarah_design",
      role: "Design Systems Architect",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80",
    },
    {
      name: "Elena Rostova",
      username: "elena_ai",
      role: "AI Research Scientist",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    },
    {
      name: "Demo User",
      username: "demo_user",
      role: "Full Platform Tester",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80",
    },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await loginAction(null, formData);
      if (res?.error) {
        setError(res.error);
      }
    });
  };

  const handleDemoLogin = (username: string) => {
    setError(null);
    startTransition(async () => {
      const res = await demoLoginAction(username);
      if (res?.error) {
        setError(res.error);
      }
    });
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-neutral-900 border border-[#2f3336] mb-2">
            <span className="font-black text-3xl">𝕏</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight">Happening now</h1>
          <p className="text-sm text-neutral-500">Sign in to join the conversation</p>
        </div>

        {/* 1-Click Demo Accounts (Top recommendation for testing) */}
        <div className="bg-[#16181c] border border-[#2f3336] rounded-2xl p-4 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-[#1d9bf0] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Instant 1-Click Test Login
            </p>
            <span className="text-[10px] text-neutral-500 bg-neutral-800 px-2 py-0.5 rounded-full">
              Seeded Demo Accounts
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {demoUsers.map((user) => (
              <button
                key={user.username}
                disabled={isPending}
                onClick={() => handleDemoLogin(user.username)}
                className="flex items-center gap-2.5 p-2 rounded-xl bg-black/60 hover:bg-black border border-[#2f3336] hover:border-[#1d9bf0] text-left transition-all cursor-pointer group disabled:opacity-50"
              >
                <Avatar src={user.image} name={user.name} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-white truncate group-hover:text-[#1d9bf0]">
                    {user.name}
                  </p>
                  <p className="text-[10px] text-neutral-500 truncate">@{user.username}</p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-[#1d9bf0] shrink-0 transition-transform group-hover:translate-x-0.5" />
              </button>
            ))}
          </div>
        </div>

        {/* Credentials Form */}
        <div className="bg-[#16181c] border border-[#2f3336] rounded-2xl p-6 shadow-xl space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 text-xs rounded-xl bg-red-500/15 border border-red-500/30 text-red-400">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-neutral-400 mb-1">
                Username or Email
              </label>
              <input
                type="text"
                name="login"
                required
                placeholder="alex_dev or alex@example.com"
                className="w-full bg-black border border-[#2f3336] focus:border-[#1d9bf0] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-400 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                className="w-full bg-black border border-[#2f3336] focus:border-[#1d9bf0] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 outline-none transition-colors"
              />
            </div>

            <Button
              type="submit"
              variant="tweet"
              size="lg"
              loading={isPending}
              className="rounded-full font-bold h-11 text-base shadow-md"
            >
              Sign In
            </Button>
          </form>

          <div className="pt-2 text-center text-xs text-neutral-500">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-[#1d9bf0] font-bold hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
