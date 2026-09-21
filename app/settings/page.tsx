import { redirect } from "next/navigation";
import Link from "next/link";
import { Settings, Shield, Palette, User, LogOut, ArrowRight } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { ThemeSwitcher } from "@/components/settings/ThemeSwitcher";
import { logoutAction } from "@/actions/auth";
import { getCurrentUser } from "@/lib/auth";
import { format } from "date-fns";

export default async function SettingsPage() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect("/login");
  }

  const joinDate = currentUser.createdAt
    ? format(new Date(currentUser.createdAt), "MMMM d, yyyy")
    : "January 2026";

  return (
    <AppShell headerTitle="Settings">
      {/* Top Header */}
      <div className="sticky top-0 z-20 bg-black/80 backdrop-blur-md border-b border-[#2f3336] px-4 py-3">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-[#1d9bf0]" /> Settings
        </h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Your Account */}
        <section className="bg-[#16181c] border border-[#2f3336] rounded-2xl p-4 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-white font-bold text-base">
            <User className="w-5 h-5 text-[#1d9bf0]" /> Your Account
          </div>
          <p className="text-xs text-neutral-400">
            See information about your account, and manage your credentials.
          </p>

          <div className="divide-y divide-[#2f3336]/60 pt-1">
            <div className="py-2.5 flex items-center justify-between text-sm">
              <span className="text-neutral-400">Display Name</span>
              <span className="font-semibold text-white">{currentUser.name}</span>
            </div>
            <div className="py-2.5 flex items-center justify-between text-sm">
              <span className="text-neutral-400">Username</span>
              <span className="font-semibold text-[#1d9bf0]">@{currentUser.username}</span>
            </div>
            <div className="py-2.5 flex items-center justify-between text-sm">
              <span className="text-neutral-400">Email</span>
              <span className="font-semibold text-white">{currentUser.email}</span>
            </div>
            <div className="py-2.5 flex items-center justify-between text-sm">
              <span className="text-neutral-400">Account Created</span>
              <span className="font-semibold text-white">{joinDate}</span>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href={`/${currentUser.username}`}
              className="flex items-center justify-between p-3 rounded-xl bg-neutral-900/60 hover:bg-neutral-800 transition-colors text-sm font-semibold text-white"
            >
              <span>Edit profile details</span>
              <ArrowRight className="w-4 h-4 text-neutral-400" />
            </Link>
          </div>
        </section>

        {/* Appearance */}
        <section className="bg-[#16181c] border border-[#2f3336] rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2 text-white font-bold text-base">
            <Palette className="w-5 h-5 text-[#1d9bf0]" /> Appearance & Theme
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Manage your color scheme and display preferences.
          </p>
          <ThemeSwitcher />
        </section>

        {/* Security & Privacy */}
        <section className="bg-[#16181c] border border-[#2f3336] rounded-2xl p-4 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-white font-bold text-base">
            <Shield className="w-5 h-5 text-[#1d9bf0]" /> Security & Rate Limiting
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Your account is secured with password hashing (bcrypt), CSRF protection, and token bucket rate limiters preventing spam across posts, likes, follows, and direct messages.
          </p>
        </section>

        {/* Session / Logout */}
        <section className="bg-[#16181c] border border-[#2f3336] rounded-2xl p-4 shadow-sm">
          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Log out of @{currentUser.username}</span>
            </button>
          </form>
        </section>
      </div>
    </AppShell>
  );
}
