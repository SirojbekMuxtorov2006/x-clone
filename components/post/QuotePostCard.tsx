import React from "react";
import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { formatRelativeTime } from "@/lib/utils";

interface QuotePostCardProps {
  post: {
    id: string;
    content: string;
    createdAt: Date | string;
    author: {
      name: string | null;
      username: string;
      image: string | null;
    };
  };
}

export function QuotePostCard({ post }: QuotePostCardProps) {
  return (
    <Link
      href={`/post/${post.id}`}
      className="mt-3 block border border-[#2f3336] hover:border-neutral-600 rounded-2xl p-3 bg-neutral-900/40 transition-colors"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center gap-2 mb-1.5">
        <Avatar
          src={post.author.image}
          name={post.author.name}
          alt={post.author.username}
          size="xs"
        />
        <span className="font-bold text-xs text-white truncate max-w-[140px]">
          {post.author.name}
        </span>
        <span className="text-xs text-neutral-500 truncate">@{post.author.username}</span>
        <span className="text-xs text-neutral-500">·</span>
        <span className="text-xs text-neutral-500">
          {formatRelativeTime(post.createdAt)}
        </span>
      </div>

      <p className="text-xs sm:text-sm text-neutral-200 line-clamp-3 leading-relaxed">
        {post.content}
      </p>
    </Link>
  );
}
