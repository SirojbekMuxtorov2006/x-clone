"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface MediaItem {
  id?: string;
  url: string;
  type?: string;
}

interface PostMediaGridProps {
  media: MediaItem[];
  className?: string;
}

export function PostMediaGrid({ media, className }: PostMediaGridProps) {
  if (!media || media.length === 0) return null;

  const count = media.length;

  if (count === 1) {
    return (
      <div
        className={cn(
          "relative mt-3 rounded-2xl overflow-hidden border border-[#2f3336] max-h-[500px] w-full bg-neutral-900",
          className
        )}
      >
        <div className="relative w-full h-[320px] sm:h-[400px]">
          <Image
            src={media[0].url}
            alt="Post attachment"
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            className="object-cover"
          />
        </div>
      </div>
    );
  }

  if (count === 2) {
    return (
      <div
        className={cn(
          "grid grid-cols-2 gap-1 mt-3 rounded-2xl overflow-hidden border border-[#2f3336] h-64 sm:h-72 w-full",
          className
        )}
      >
        {media.map((item, idx) => (
          <div key={item.url + idx} className="relative w-full h-full bg-neutral-900">
            <Image
              src={item.url}
              alt={`Attachment ${idx + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, 300px"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    );
  }

  if (count === 3) {
    return (
      <div
        className={cn(
          "grid grid-cols-2 gap-1 mt-3 rounded-2xl overflow-hidden border border-[#2f3336] h-64 sm:h-72 w-full",
          className
        )}
      >
        <div className="relative w-full h-full bg-neutral-900">
          <Image
            src={media[0].url}
            alt="Attachment 1"
            fill
            sizes="(max-width: 768px) 50vw, 300px"
            className="object-cover"
          />
        </div>
        <div className="grid grid-rows-2 gap-1 h-full">
          {media.slice(1, 3).map((item, idx) => (
            <div key={item.url + idx} className="relative w-full h-full bg-neutral-900">
              <Image
                src={item.url}
                alt={`Attachment ${idx + 2}`}
                fill
                sizes="(max-width: 768px) 50vw, 300px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 4 items: 2x2 grid
  return (
    <div
      className={cn(
        "grid grid-cols-2 grid-rows-2 gap-1 mt-3 rounded-2xl overflow-hidden border border-[#2f3336] h-64 sm:h-80 w-full",
        className
      )}
    >
      {media.slice(0, 4).map((item, idx) => (
        <div key={item.url + idx} className="relative w-full h-full bg-neutral-900">
          <Image
            src={item.url}
            alt={`Attachment ${idx + 1}`}
            fill
            sizes="(max-width: 768px) 50vw, 300px"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
