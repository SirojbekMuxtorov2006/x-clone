"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface AvatarProps {
  src?: string | null;
  alt?: string;
  name?: string | null;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeClasses = {
  xs: "w-6 h-6 text-xs",
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-14 h-14 text-base",
  xl: "w-28 h-28 text-2xl",
};

export function Avatar({ src, alt = "Avatar", name, size = "md", className }: AvatarProps) {
  const [error, setError] = useState(false);

  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "X";

  return (
    <div
      className={cn(
        "relative rounded-full overflow-hidden shrink-0 bg-neutral-800 flex items-center justify-center font-bold text-white select-none ring-1 ring-border/20",
        sizeClasses[size],
        className
      )}
    >
      {src && !error ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100px, 150px"
          className="object-cover"
          onError={() => setError(true)}
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}
