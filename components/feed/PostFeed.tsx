"use client";

import React, { useState } from "react";
import { PostCard, PostCardProps } from "@/components/post/PostCard";
import { PostComposer } from "@/components/post/PostComposer";
import { FeedTabs } from "./FeedTabs";
import { Sparkles, Users } from "lucide-react";

interface PostFeedProps {
  initialForYouPosts: PostCardProps["post"][];
  initialFollowingPosts: PostCardProps["post"][];
  currentUser: PostCardProps["currentUser"];
}

export function PostFeed({
  initialForYouPosts,
  initialFollowingPosts,
  currentUser,
}: PostFeedProps) {
  const [activeTab, setActiveTab] = useState<"for-you" | "following">("for-you");

  const posts = activeTab === "for-you" ? initialForYouPosts : initialFollowingPosts;

  return (
    <div>
      {/* Top Feed Tabs */}
      <FeedTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Post Composer */}
      {currentUser && (
        <PostComposer
          currentUser={currentUser}
          placeholder="What is happening?!"
        />
      )}

      {/* Posts List */}
      {posts && posts.length > 0 ? (
        <div className="divide-y divide-[#2f3336]">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} currentUser={currentUser} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="p-8 text-center flex flex-col items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-neutral-900 border border-[#2f3336] flex items-center justify-center mb-3">
            {activeTab === "following" ? (
              <Users className="w-7 h-7 text-[#1d9bf0]" />
            ) : (
              <Sparkles className="w-7 h-7 text-[#1d9bf0]" />
            )}
          </div>
          <h3 className="text-xl font-bold text-white mb-1">
            {activeTab === "following"
              ? "Welcome to your timeline!"
              : "No posts yet"}
          </h3>
          <p className="text-sm text-neutral-500 max-w-sm">
            {activeTab === "following"
              ? "When you follow people, their posts will appear here. Check out suggested accounts in the sidebar to get started."
              : "Be the first one to post and start the conversation!"}
          </p>
        </div>
      )}
    </div>
  );
}
