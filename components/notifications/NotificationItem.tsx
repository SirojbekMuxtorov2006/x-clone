"use client";

import React from "react";
import Link from "next/link";
import { Heart, Repeat2, MessageCircle, Quote, UserPlus, AtSign } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { markNotificationAsReadAction } from "@/actions/notification";
import { formatRelativeTime } from "@/lib/utils";

interface NotificationItemProps {
  notification: {
    id: string;
    type: string;
    isRead: boolean;
    createdAt: Date | string;
    issuer: {
      id: string;
      name: string | null;
      username: string;
      image: string | null;
    };
    post?: {
      id: string;
      content: string;
    } | null;
  };
}

export function NotificationItem({ notification }: NotificationItemProps) {
  const handleClick = async () => {
    if (!notification.isRead) {
      await markNotificationAsReadAction(notification.id);
    }
  };

  const getIcon = () => {
    switch (notification.type) {
      case "LIKE":
        return <Heart className="w-6 h-6 text-[#f91880] fill-current" />;
      case "REPOST":
        return <Repeat2 className="w-6 h-6 text-[#00ba7c]" />;
      case "REPLY":
        return <MessageCircle className="w-6 h-6 text-[#1d9bf0]" />;
      case "QUOTE":
        return <Quote className="w-6 h-6 text-[#1d9bf0]" />;
      case "FOLLOW":
        return <UserPlus className="w-6 h-6 text-[#1d9bf0]" />;
      case "MENTION":
        return <AtSign className="w-6 h-6 text-[#1d9bf0]" />;
      default:
        return <MessageCircle className="w-6 h-6 text-[#1d9bf0]" />;
    }
  };

  const getText = () => {
    switch (notification.type) {
      case "LIKE":
        return "liked your post";
      case "REPOST":
        return "reposted your post";
      case "REPLY":
        return "replied to your post";
      case "QUOTE":
        return "quoted your post";
      case "FOLLOW":
        return "followed you";
      case "MENTION":
        return "mentioned you in a post";
      default:
        return "interacted with you";
    }
  };

  const linkTarget = notification.post
    ? `/post/${notification.post.id}`
    : `/${notification.issuer.username}`;

  return (
    <Link
      href={linkTarget}
      onClick={handleClick}
      className={`p-4 border-b border-[#2f3336] flex gap-3 hover:bg-neutral-900/30 transition-colors ${
        !notification.isRead ? "bg-neutral-900/15" : ""
      }`}
    >
      <div className="shrink-0 pt-0.5">{getIcon()}</div>

      <div className="flex-1 min-w-0 space-y-1.5">
        <div className="flex items-center gap-2">
          <Avatar
            src={notification.issuer.image}
            name={notification.issuer.name}
            alt={notification.issuer.username}
            size="sm"
          />
          <span className="text-xs text-neutral-500">
            {formatRelativeTime(notification.createdAt)}
          </span>
        </div>

        <p className="text-sm text-neutral-300">
          <strong className="font-bold text-white hover:underline">
            {notification.issuer.name}
          </strong>{" "}
          {getText()}
        </p>

        {notification.post && (
          <p className="text-xs text-neutral-500 line-clamp-2 mt-1">
            {notification.post.content}
          </p>
        )}
      </div>
    </Link>
  );
}
