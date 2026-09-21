"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { PostActions } from "./PostActions";
import { PostMediaGrid } from "./PostMediaGrid";
import { QuotePostCard } from "./QuotePostCard";
import { PostContentText } from "./PostContentText";
import { deletePostAction } from "@/actions/post";
import { useToast } from "@/components/ui/Toast";
import { formatRelativeTime } from "@/lib/utils";

export interface PostCardProps {
  post: {
    id: string;
    content: string;
    createdAt: Date | string;
    viewCount: number;
    author: {
      id: string;
      name: string | null;
      username: string;
      image: string | null;
    };
    media?: Array<{ id: string; url: string; type: string }>;
    quoteOf?: {
      id: string;
      content: string;
      createdAt: Date | string;
      author: {
        name: string | null;
        username: string;
        image: string | null;
      };
    } | null;
    _count?: {
      likes: number;
      reposts: number;
      replies: number;
    };
    isLiked?: boolean;
    isReposted?: boolean;
    isBookmarked?: boolean;
  };
  currentUser: {
    id: string;
    name: string | null;
    username: string;
    image: string | null;
  } | null;
  isDetailView?: boolean;
}

export function PostCard({ post, currentUser, isDetailView = false }: PostCardProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  if (isDeleted) return null;

  const isOwner = currentUser?.id === post.author.id;

  const handleCardClick = (e: React.MouseEvent) => {
    // Avoid redirect if clicking links, buttons, or inputs
    const target = e.target as HTMLElement;
    if (
      target.closest("a") ||
      target.closest("button") ||
      target.closest("input") ||
      target.closest("textarea")
    ) {
      return;
    }
    if (!isDetailView) {
      router.push(`/post/${post.id}`);
    }
  };

  const handleDeletePost = async () => {
    setIsDeleting(true);
    try {
      const res = await deletePostAction(post.id);
      if (res.success) {
        setIsDeleted(true);
        setIsDeleteDialogOpen(false);
        toast("Your post was deleted", "success");
        if (isDetailView) {
          router.push("/");
        }
      } else {
        toast(res.error || "Failed to delete post", "error");
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <article
        onClick={handleCardClick}
        className={`p-4 border-b border-[#2f3336] transition-colors flex gap-3 ${
          !isDetailView ? "hover:bg-neutral-900/30 cursor-pointer" : ""
        }`}
      >
        {/* Author Avatar */}
        <Link
          href={`/${post.author.username}`}
          onClick={(e) => e.stopPropagation()}
          className="shrink-0"
        >
          <Avatar
            src={post.author.image}
            name={post.author.name}
            alt={post.author.username}
            size="md"
            className="hover:opacity-90 transition-opacity"
          />
        </Link>

        {/* Post Body */}
        <div className="flex-1 min-w-0">
          {/* Header row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 min-w-0 flex-wrap">
              <Link
                href={`/${post.author.username}`}
                onClick={(e) => e.stopPropagation()}
                className="font-bold text-sm text-white hover:underline truncate"
              >
                {post.author.name}
              </Link>
              <span className="text-xs text-neutral-500 truncate">
                @{post.author.username}
              </span>
              <span className="text-xs text-neutral-500">·</span>
              <span className="text-xs text-neutral-500 hover:underline">
                {formatRelativeTime(post.createdAt)}
              </span>
            </div>

            {/* Options Dropdown */}
            {isOwner && (
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMenuOpen(!isMenuOpen);
                  }}
                  className="p-1.5 text-neutral-500 hover:text-white hover:bg-neutral-800 rounded-full transition-colors cursor-pointer"
                  aria-label="Post options"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>

                {isMenuOpen && (
                  <div
                    className="absolute right-0 top-6 z-30 w-36 bg-black border border-[#2f3336] rounded-xl shadow-2xl p-1 animate-in fade-in"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsDeleteDialogOpen(true);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-red-500 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Content */}
          <PostContentText
            content={post.content}
            className={`mt-1 text-[#e7e9ea] whitespace-pre-line break-words leading-relaxed ${
              isDetailView ? "text-lg sm:text-xl py-2" : "text-sm"
            }`}
          />

          {/* Media Attachments */}
          {post.media && post.media.length > 0 && (
            <div onClick={(e) => e.stopPropagation()}>
              <PostMediaGrid media={post.media} />
            </div>
          )}

          {/* Quoted Post */}
          {post.quoteOf && <QuotePostCard post={post.quoteOf} />}

          {/* Engagement Actions */}
          <PostActions
            postId={post.id}
            initialLikesCount={post._count?.likes ?? 0}
            initialRepostsCount={post._count?.reposts ?? 0}
            initialRepliesCount={post._count?.replies ?? 0}
            initialViewsCount={post.viewCount}
            initialIsLiked={!!post.isLiked}
            initialIsReposted={!!post.isReposted}
            initialIsBookmarked={!!post.isBookmarked}
            currentUser={currentUser}
          />
        </div>
      </article>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        title="Delete post?"
      >
        <p className="text-sm text-neutral-400 mb-5">
          This can’t be undone and it will be removed from your profile, the timeline of any accounts that follow you, and from search results.
        </p>
        <div className="flex flex-col gap-2.5">
          <Button
            onClick={handleDeletePost}
            loading={isDeleting}
            variant="danger"
            size="lg"
            className="rounded-full font-bold"
          >
            Delete
          </Button>
          <Button
            onClick={() => setIsDeleteDialogOpen(false)}
            variant="outline"
            size="lg"
            className="rounded-full font-bold"
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
}
