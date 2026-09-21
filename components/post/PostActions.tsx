"use client";

import React, { useState } from "react";
import {
  MessageCircle,
  Repeat2,
  Heart,
  BarChart2,
  Bookmark,
  Share,
  Quote,
} from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { PostComposer } from "@/components/post/PostComposer";
import { useToast } from "@/components/ui/Toast";
import {
  toggleLikeAction,
  toggleRepostAction,
  toggleBookmarkAction,
} from "@/actions/post";
import { formatNumber, cn } from "@/lib/utils";

interface PostActionsProps {
  postId: string;
  initialLikesCount: number;
  initialRepostsCount: number;
  initialRepliesCount: number;
  initialViewsCount: number;
  initialIsLiked: boolean;
  initialIsReposted: boolean;
  initialIsBookmarked: boolean;
  currentUser: {
    id: string;
    name: string | null;
    username: string;
    image: string | null;
  } | null;
}

export function PostActions({
  postId,
  initialLikesCount,
  initialRepostsCount,
  initialRepliesCount,
  initialViewsCount,
  initialIsLiked,
  initialIsReposted,
  initialIsBookmarked,
  currentUser,
}: PostActionsProps) {
  const { toast } = useToast();

  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [likeAnimating, setLikeAnimating] = useState(false);

  const [isReposted, setIsReposted] = useState(initialIsReposted);
  const [repostsCount, setRepostsCount] = useState(initialRepostsCount);

  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);

  const [isRepostMenuOpen, setIsRepostMenuOpen] = useState(false);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  // Optimistic Like
  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentUser) {
      toast("Please log in to like posts", "error");
      return;
    }

    const nextState = !isLiked;
    setIsLiked(nextState);
    setLikesCount((prev) => (nextState ? prev + 1 : Math.max(0, prev - 1)));
    if (nextState) setLikeAnimating(true);

    try {
      const res = await toggleLikeAction(postId);
      if (!res.success) {
        // revert on failure
        setIsLiked(!nextState);
        setLikesCount((prev) => (nextState ? Math.max(0, prev - 1) : prev + 1));
      }
    } catch {
      setIsLiked(!nextState);
      setLikesCount((prev) => (nextState ? Math.max(0, prev - 1) : prev + 1));
    }
  };

  // Optimistic Repost
  const handleRepost = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRepostMenuOpen(false);

    if (!currentUser) {
      toast("Please log in to repost", "error");
      return;
    }

    const nextState = !isReposted;
    setIsReposted(nextState);
    setRepostsCount((prev) => (nextState ? prev + 1 : Math.max(0, prev - 1)));

    try {
      const res = await toggleRepostAction(postId);
      if (!res.success) {
        setIsReposted(!nextState);
        setRepostsCount((prev) => (nextState ? Math.max(0, prev - 1) : prev + 1));
      } else {
        toast(nextState ? "Reposted" : "Repost undone", "success");
      }
    } catch {
      setIsReposted(!nextState);
      setRepostsCount((prev) => (nextState ? Math.max(0, prev - 1) : prev + 1));
    }
  };

  // Optimistic Bookmark
  const handleBookmark = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentUser) {
      toast("Please log in to bookmark", "error");
      return;
    }

    const nextState = !isBookmarked;
    setIsBookmarked(nextState);
    toast(nextState ? "Saved to your Bookmarks" : "Removed from Bookmarks", "success");

    try {
      const res = await toggleBookmarkAction(postId);
      if (!res.success) {
        setIsBookmarked(!nextState);
      }
    } catch {
      setIsBookmarked(!nextState);
    }
  };

  // Copy Link
  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/post/${postId}`;
    try {
      await navigator.clipboard.writeText(url);
      toast("Link copied to clipboard", "success");
    } catch {
      toast("Failed to copy link", "error");
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mt-3 text-neutral-500 max-w-md select-none text-xs">
        {/* Reply */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (!currentUser) {
              toast("Please log in to reply", "error");
              return;
            }
            setIsReplyModalOpen(true);
          }}
          className="flex items-center gap-1.5 hover:text-[#1d9bf0] transition-colors group cursor-pointer"
          aria-label="Reply"
        >
          <div className="p-2 rounded-full group-hover:bg-[#1d9bf0]/10 transition-colors">
            <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </div>
          <span>{initialRepliesCount > 0 ? formatNumber(initialRepliesCount) : ""}</span>
        </button>

        {/* Repost */}
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsRepostMenuOpen(!isRepostMenuOpen);
            }}
            className={cn(
              "flex items-center gap-1.5 transition-colors group cursor-pointer",
              isReposted ? "text-[#00ba7c]" : "hover:text-[#00ba7c]"
            )}
            aria-label="Repost"
          >
            <div className="p-2 rounded-full group-hover:bg-[#00ba7c]/10 transition-colors">
              <Repeat2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </div>
            <span>{repostsCount > 0 ? formatNumber(repostsCount) : ""}</span>
          </button>

          {/* Repost / Quote Menu Dropdown */}
          {isRepostMenuOpen && (
            <div
              className="absolute bottom-8 left-0 z-40 w-44 bg-black border border-[#2f3336] rounded-xl shadow-2xl p-1 animate-in fade-in zoom-in-95"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleRepost}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-neutral-200 hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
              >
                <Repeat2 className="w-4 h-4 text-[#00ba7c]" />
                <span>{isReposted ? "Undo Repost" : "Repost"}</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsRepostMenuOpen(false);
                  if (!currentUser) {
                    toast("Please log in to quote posts", "error");
                    return;
                  }
                  setIsQuoteModalOpen(true);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-neutral-200 hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
              >
                <Quote className="w-4 h-4 text-[#1d9bf0]" />
                <span>Quote Post</span>
              </button>
            </div>
          )}
        </div>

        {/* Like */}
        <button
          onClick={handleLike}
          className={cn(
            "flex items-center gap-1.5 transition-colors group cursor-pointer",
            isLiked ? "text-[#f91880]" : "hover:text-[#f91880]"
          )}
          aria-label="Like"
        >
          <div className="p-2 rounded-full group-hover:bg-[#f91880]/10 transition-colors">
            <Heart
              className={cn(
                "w-4 h-4 group-hover:scale-110 transition-transform",
                isLiked && "fill-current",
                likeAnimating && "animate-heart"
              )}
              onAnimationEnd={() => setLikeAnimating(false)}
            />
          </div>
          <span>{likesCount > 0 ? formatNumber(likesCount) : ""}</span>
        </button>

        {/* Views */}
        <div className="flex items-center gap-1.5 hover:text-[#1d9bf0] transition-colors group cursor-default">
          <div className="p-2 rounded-full group-hover:bg-[#1d9bf0]/10 transition-colors">
            <BarChart2 className="w-4 h-4" />
          </div>
          <span>{initialViewsCount > 0 ? formatNumber(initialViewsCount) : "1"}</span>
        </div>

        {/* Bookmark & Share */}
        <div className="flex items-center">
          <button
            onClick={handleBookmark}
            className={cn(
              "p-2 rounded-full transition-colors cursor-pointer",
              isBookmarked
                ? "text-[#1d9bf0] hover:bg-[#1d9bf0]/10"
                : "hover:text-[#1d9bf0] hover:bg-[#1d9bf0]/10"
            )}
            aria-label="Bookmark"
          >
            <Bookmark className={cn("w-4 h-4", isBookmarked && "fill-current")} />
          </button>

          <button
            onClick={handleShare}
            className="p-2 rounded-full hover:text-[#1d9bf0] hover:bg-[#1d9bf0]/10 transition-colors cursor-pointer"
            aria-label="Share"
          >
            <Share className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Reply Modal */}
      <Modal isOpen={isReplyModalOpen} onClose={() => setIsReplyModalOpen(false)} title="Reply">
        <div className="mb-3 text-xs text-neutral-500">
          Replying to post
        </div>
        <PostComposer
          currentUser={currentUser}
          replyToId={postId}
          placeholder="Post your reply"
          onSuccess={() => {
            setIsReplyModalOpen(false);
            toast("Reply posted", "success");
          }}
          autoFocus
        />
      </Modal>

      {/* Quote Post Modal */}
      <Modal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} title="Quote">
        <PostComposer
          currentUser={currentUser}
          quoteOfId={postId}
          placeholder="Add a comment"
          onSuccess={() => {
            setIsQuoteModalOpen(false);
            toast("Quoted post published", "success");
          }}
          autoFocus
        />
      </Modal>
    </>
  );
}
