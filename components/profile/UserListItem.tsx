"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { toggleFollowAction } from "@/actions/user";
import { useToast } from "@/components/ui/Toast";

interface UserListItemProps {
  user: {
    id: string;
    name: string | null;
    username: string;
    image: string | null;
    bio: string | null;
    isFollowing: boolean;
  };
  currentUser: {
    id: string;
  } | null;
}

export function UserListItem({ user, currentUser }: UserListItemProps) {
  const { toast } = useToast();
  const [isFollowing, setIsFollowing] = useState(user.isFollowing);
  const [loading, setLoading] = useState(false);

  const isSelf = currentUser?.id === user.id;

  const handleFollow = async () => {
    if (!currentUser) {
      toast("Please log in to follow users", "error");
      return;
    }

    setLoading(true);
    const nextState = !isFollowing;
    setIsFollowing(nextState);

    try {
      const res = await toggleFollowAction(user.id);
      if (!res.success) {
        setIsFollowing(!nextState);
        toast(res.error || "Failed to update follow", "error");
      }
    } catch {
      setIsFollowing(!nextState);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 flex items-center justify-between hover:bg-neutral-900/30 transition-colors">
      <Link href={`/${user.username}`} className="flex items-center gap-3 min-w-0 group">
        <Avatar src={user.image} name={user.name} alt={user.username} size="md" />
        <div className="min-w-0">
          <p className="font-bold text-sm text-white group-hover:underline truncate">
            {user.name}
          </p>
          <p className="text-xs text-neutral-500 truncate">@{user.username}</p>
          {user.bio && (
            <p className="text-xs text-neutral-300 mt-1 line-clamp-1">{user.bio}</p>
          )}
        </div>
      </Link>

      {!isSelf && (
        <Button
          onClick={handleFollow}
          loading={loading}
          variant={isFollowing ? "outline" : "secondary"}
          size="sm"
          className="rounded-full font-bold px-4 shrink-0 text-xs ml-3"
        >
          {isFollowing ? "Following" : "Follow"}
        </Button>
      )}
    </div>
  );
}
