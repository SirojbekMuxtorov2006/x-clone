import React from "react";
import Link from "next/link";

interface PostContentTextProps {
  content: string;
  className?: string;
}

export function PostContentText({ content, className }: PostContentTextProps) {
  // Regex to split by hashtags, mentions, and urls
  const parts = content.split(/(\s+|#\w+|@\w+|https?:\/\/[^\s]+)/g);

  return (
    <div className={className}>
      {parts.map((part, i) => {
        if (part.startsWith("#") && part.length > 1) {
          const tag = part.slice(1).toLowerCase();
          return (
            <Link
              key={i}
              href={`/hashtag/${tag}`}
              onClick={(e) => e.stopPropagation()}
              className="text-[#1d9bf0] hover:underline cursor-pointer"
            >
              {part}
            </Link>
          );
        }

        if (part.startsWith("@") && part.length > 1) {
          const handle = part.slice(1).toLowerCase();
          return (
            <Link
              key={i}
              href={`/${handle}`}
              onClick={(e) => e.stopPropagation()}
              className="text-[#1d9bf0] hover:underline cursor-pointer"
            >
              {part}
            </Link>
          );
        }

        if (part.startsWith("http://") || part.startsWith("https://")) {
          return (
            <a
              key={i}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-[#1d9bf0] hover:underline break-all"
            >
              {part}
            </a>
          );
        }

        return <span key={i}>{part}</span>;
      })}
    </div>
  );
}
