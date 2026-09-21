"use client";

import React, { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof document !== "undefined") {
      return document.documentElement.classList.contains("light") ? "light" : "dark";
    }
    return "dark";
  });

  const toggleTheme = (newTheme: "dark" | "light") => {
    setTheme(newTheme);
    if (newTheme === "light") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    }
  };

  return (
    <div className="grid grid-cols-2 gap-3 mt-3">
      {/* Dark / Pitch Black */}
      <button
        onClick={() => toggleTheme("dark")}
        className={cn(
          "p-4 rounded-2xl border flex items-center justify-between transition-all cursor-pointer",
          theme === "dark"
            ? "border-[#1d9bf0] bg-neutral-900 text-white ring-2 ring-[#1d9bf0]/20"
            : "border-[#2f3336] bg-neutral-950 text-neutral-400 hover:border-neutral-500"
        )}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-black border border-white/10 text-white">
            <Moon className="w-5 h-5" />
          </div>
          <div className="text-left">
            <p className="font-bold text-sm text-white">Dark Mode</p>
            <p className="text-xs text-neutral-500">True black aesthetic</p>
          </div>
        </div>
        <div
          className={cn(
            "w-4 h-4 rounded-full border flex items-center justify-center",
            theme === "dark" ? "border-[#1d9bf0] bg-[#1d9bf0]" : "border-neutral-600"
          )}
        >
          {theme === "dark" && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
        </div>
      </button>

      {/* Light */}
      <button
        onClick={() => toggleTheme("light")}
        className={cn(
          "p-4 rounded-2xl border flex items-center justify-between transition-all cursor-pointer",
          theme === "light"
            ? "border-[#1d9bf0] bg-neutral-900 text-white ring-2 ring-[#1d9bf0]/20"
            : "border-[#2f3336] bg-neutral-950 text-neutral-400 hover:border-neutral-500"
        )}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400">
            <Sun className="w-5 h-5" />
          </div>
          <div className="text-left">
            <p className="font-bold text-sm text-white">Light Mode</p>
            <p className="text-xs text-neutral-500">High contrast white</p>
          </div>
        </div>
        <div
          className={cn(
            "w-4 h-4 rounded-full border flex items-center justify-center",
            theme === "light" ? "border-[#1d9bf0] bg-[#1d9bf0]" : "border-neutral-600"
          )}
        >
          {theme === "light" && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
        </div>
      </button>
    </div>
  );
}
