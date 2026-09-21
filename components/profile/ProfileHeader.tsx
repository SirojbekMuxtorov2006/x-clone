"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Link as LinkIcon, Calendar, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { EditProfileModal } from "./EditProfileModal";
import { PostContentText } from "@/components/post/PostContentText";
import { toggleFollowAction } from "@/actions/user";
import { useToast } from "@/components/ui/Toast";
import { formatNumber } from "@/lib/utils";

interface ProfileHeaderProps {
  user: {
    id: string;
    name: string | null;
    username: string;
    bio: string | null;
    location: string | null;
    website: string | null;
    image: string | null;
    coverImage: string | null;
    createdAt: Date | string;
    _count: {
      posts: number;
      followers: number;
      following: number;
    };
  };
  currentUser: {
    id: string;
    name: string | null;
    username: string;
    image: string | null;
  } | null;
  initialIsFollowing: boolean;
}

export function ProfileHeader({
  user,
  currentUser,
  initialIsFollowing,
}: ProfileHeaderProps) {
  const { toast } = useToast();
  const isSelf = currentUser?.id === user.id;

  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [followersCount, setFollowersCount] = useState(user._count.followers);
  const [isUpdatingFollow, setIsUpdatingFollow] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleFollowToggle = async () => {
    if (!currentUser) {
      toast("Please log in to follow users", "error");
      return;
    }

    const nextState = !isFollowing;
    setIsFollowing(nextState);
    setFollowersCount((prev) => (nextState ? prev + 1 : Math.max(0, prev - 1)));

    setIsUpdatingFollow(true);
    try {
      const res = await toggleFollowAction(user.id);
      if (!res.success) {
        setIsFollowing(!nextState);
        setFollowersCount((prev) => (nextState ? Math.max(0, prev - 1) : prev + 1));
        toast(res.error || "Failed to update follow", "error");
      }
    } catch {
      setIsFollowing(!nextState);
      setFollowersCount((prev) => (nextState ? Math.max(0, prev - 1) : prev + 1));
    } finally {
      setIsUpdatingFollow(false);
    }
  };

  const joinDate = user.createdAt
    ? format(new Date(user.createdAt), "MMMM yyyy")
    : "January 2026";

  return (
    <div>
      {/* Top Header bar with Back button & Post count */}
      <div className="sticky top-0 z-20 bg-black/80 backdrop-blur-md border-b border-[#2f3336] px-4 py-2 flex items-center gap-6">
        <Link
          href="/"
          className="p-2 rounded-full hover:bg-neutral-800 transition-colors text-white"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-lg font-bold text-white leading-tight">{user.name}</h1>
          <p className="text-xs text-neutral-500">
            {formatNumber(user._count.posts)} {user._count.posts === 1 ? "post" : "posts"}
          </p>
        </div>
      </div>

      {/* Banner Cover Image */}
      <div className="relative h-36 sm:h-52 w-full bg-neutral-900 overflow-hidden">
        {user.coverImage ? (
          <Image
            src={user.coverImage}
            alt="Cover banner"
            fill
            sizes="(max-width: 768px) 100vw, 620px"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-linear-to-r from-blue-900 via-indigo-950 to-neutral-900" />
        )}
      </div>

      {/* Profile Info Section */}
      <div className="px-4 pb-4">
        {/* Avatar & Action Button Row */}
        <div className="flex items-end justify-between relative -mt-16 sm:-mt-20 mb-3">
          <div className="rounded-full ring-4 ring-black overflow-hidden">
            <Avatar
              src={user.image}
              name={user.name}
              alt={user.username}
              size="xl"
              className="w-24 h-24 sm:w-32 sm:h-32"
            />
          </div>

          <div>
            {isSelf ? (
              <Button
                onClick={() => setIsEditModalOpen(true)}
                variant="outline"
                size="md"
                className="rounded-full font-bold px-4"
              >
                Edit profile
              </Button>
            ) : (
              <Button
                onClick={handleFollowToggle}
                loading={isUpdatingFollow}
                variant={isFollowing ? "outline" : "secondary"}
                size="md"
                className="rounded-full font-bold px-5"
              >
                {isFollowing ? "Following" : "Follow"}
              </Button>
            )}
          </div>
        </div>

        {/* Name and Username */}
        <div className="mb-3">
          <h2 className="text-xl font-black text-white">{user.name}</h2>
          <p className="text-sm text-neutral-500">@{user.username}</p>
        </div>

        {/* Bio */}
        {user.bio && (
          <PostContentText
            content={user.bio}
            className="text-sm text-[#e7e9ea] whitespace-pre-line leading-relaxed mb-3"
          />
        )}

        {/* Metadata items */}
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-neutral-500 mb-3">
          {user.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{user.location}</span>
            </div>
          )}

          {user.website && (
            <div className="flex items-center gap-1">
              <LinkIcon className="w-4 h-4 text-[#1d9bf0]" />
              <a
                href={
                  user.website.startsWith("http")
                    ? user.website
                    : `https://${user.website}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1d9bf0] hover:underline truncate max-w-[200px]"
              >
                {user.website.replace(/^https?:\/\//, "")}
              </a>
            </div>
          )}

          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>Joined {joinDate}</span>
          </div>
        </div>

        {/* Follow counts */}
        <div className="flex items-center gap-4 text-xs">
          <Link
            href={`/${user.username}/following`}
            className="hover:underline flex items-center gap-1"
          >
            <strong className="font-bold text-white">
              {formatNumber(user._count.following)}
            </strong>
            <span className="text-neutral-500">Following</span>
          </Link>
          <Link
            href={`/${user.username}/followers`}
            className="hover:underline flex items-center gap-1"
          >
            <strong className="font-bold text-white">
              {formatNumber(followersCount)}
            </strong>
            <span className="text-neutral-500">Followers</span>
          </Link>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isSelf && (
        <EditProfileModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          user={user}
        />
      )}
    </div>
  );
}
