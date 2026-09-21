"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { registerAction } from "@/actions/auth";

export default function RegisterPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await registerAction(null, formData);
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
          <h1 className="text-3xl font-black tracking-tight">Create your account</h1>
          <p className="text-sm text-neutral-500">Join the world&apos;s digital town square</p>
        </div>

        {/* Registration Form */}
        <div className="bg-[#16181c] border border-[#2f3336] rounded-2xl p-6 shadow-xl space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 text-xs rounded-xl bg-red-500/15 border border-red-500/30 text-red-400">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-neutral-400 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                maxLength={50}
                placeholder="e.g. Satoshi Nakamoto"
                className="w-full bg-black border border-[#2f3336] focus:border-[#1d9bf0] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-400 mb-1">
                Username (@handle)
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-neutral-500 text-sm">@</span>
                <input
                  type="text"
                  name="username"
                  required
                  minLength={3}
                  maxLength={20}
                  placeholder="username"
                  className="w-full bg-black border border-[#2f3336] focus:border-[#1d9bf0] rounded-xl pl-8 pr-3.5 py-2.5 text-sm text-white placeholder-neutral-600 outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-400 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
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
                minLength={6}
                placeholder="At least 6 characters"
                className="w-full bg-black border border-[#2f3336] focus:border-[#1d9bf0] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 outline-none transition-colors"
              />
            </div>

            <Button
              type="submit"
              variant="tweet"
              size="lg"
              loading={isPending}
              className="rounded-full font-bold h-11 text-base shadow-md mt-2"
            >
              Sign Up
            </Button>
          </form>

          <div className="pt-2 text-center text-xs text-neutral-500">
            Already have an account?{" "}
            <Link href="/login" className="text-[#1d9bf0] font-bold hover:underline">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
