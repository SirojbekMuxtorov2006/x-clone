"use client";

import React, { useState, useRef, useEffect } from "react";
import { Image as ImageIcon, Smile, X, Globe } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { createPostAction } from "@/actions/post";
import { cn } from "@/lib/utils";

interface PostComposerProps {
  currentUser: {
    id: string;
    name: string | null;
    username: string;
    image: string | null;
  } | null;
  placeholder?: string;
  replyToId?: string;
  quoteOfId?: string;
  onSuccess?: () => void;
  autoFocus?: boolean;
}

export function PostComposer({
  currentUser,
  placeholder = "What is happening?!",
  replyToId,
  quoteOfId,
  onSuccess,
  autoFocus = false,
}: PostComposerProps) {
  const { toast } = useToast();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [content, setContent] = useState("");
  const [media, setMedia] = useState<Array<{ url: string; type: "image" | "gif" | "video" }>>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const MAX_CHARS = 280;
  const charsRemaining = MAX_CHARS - content.length;
  const percentageUsed = Math.min(100, (content.length / MAX_CHARS) * 100);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.max(60, textareaRef.current.scrollHeight)}px`;
    }
  }, [content]);

  useEffect(() => {
    if (autoFocus && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [autoFocus]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (media.length + files.length > 4) {
      toast("You can only attach up to 4 images per post", "error");
      return;
    }

    setIsUploading(true);
    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (data.success && data.url) {
          setMedia((prev) => [...prev, { url: data.url, type: "image" }]);
        } else {
          toast(data.error || "Failed to upload image", "error");
        }
      }
    } catch {
      toast("An error occurred while uploading", "error");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const removeMedia = (index: number) => {
    setMedia((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!currentUser) {
      toast("Please log in to post", "error");
      return;
    }

    if (!content.trim() && media.length === 0) {
      return;
    }

    if (content.length > MAX_CHARS) {
      toast("Post exceeds character limit", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await createPostAction({
        content: content.trim(),
        replyToId,
        quoteOfId,
        media,
      });

      if (res.success) {
        setContent("");
        setMedia([]);
        toast(replyToId ? "Reply sent" : "Your post was sent", "success");
        if (onSuccess) onSuccess();
      } else {
        toast(res.error || "Failed to create post", "error");
      }
    } catch {
      toast("Something went wrong", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 border-b border-[#2f3336] flex gap-3">
      {/* User Avatar */}
      <Avatar
        src={currentUser?.image}
        name={currentUser?.name}
        alt={currentUser?.username || "User"}
        size="md"
        className="shrink-0"
      />

      {/* Input Area */}
      <div className="flex-1 min-w-0">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={placeholder}
          rows={2}
          className="w-full bg-transparent text-white text-base sm:text-lg placeholder-neutral-500 outline-none resize-none leading-relaxed"
        />

        {/* Media Previews */}
        {media.length > 0 && (
          <div className="grid grid-cols-2 gap-2 my-3 rounded-2xl overflow-hidden max-h-60">
            {media.map((item, idx) => (
              <div key={item.url + idx} className="relative h-32 bg-neutral-900 rounded-xl overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.url}
                  alt={`Upload ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeMedia(idx)}
                  className="absolute top-2 right-2 p-1 bg-black/70 hover:bg-black text-white rounded-full transition-colors cursor-pointer"
                  aria-label="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Audience note */}
        <div className="pb-3 border-b border-[#2f3336]/60 flex items-center gap-1.5 text-xs font-bold text-[#1d9bf0]">
          <Globe className="w-3.5 h-3.5" />
          <span>Everyone can reply</span>
        </div>

        {/* Footer toolbar */}
        <div className="flex items-center justify-between pt-3">
          {/* Media & Emoji Icons */}
          <div className="flex items-center gap-1 text-[#1d9bf0]">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png, image/jpeg, image/webp, image/gif"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              type="button"
              disabled={isUploading || media.length >= 4}
              onClick={() => fileInputRef.current?.click()}
              className="p-2 rounded-full hover:bg-[#1d9bf0]/10 transition-colors disabled:opacity-40 cursor-pointer"
              aria-label="Add image"
            >
              <ImageIcon className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => setContent((prev) => prev + " 🚀 ")}
              className="p-2 rounded-full hover:bg-[#1d9bf0]/10 transition-colors cursor-pointer"
              aria-label="Add emoji"
            >
              <Smile className="w-5 h-5" />
            </button>
          </div>

          {/* Right Actions: Char count ring + Submit button */}
          <div className="flex items-center gap-3">
            {content.length > 0 && (
              <div className="flex items-center gap-2">
                {/* Circular Progress Ring */}
                <div className="relative w-7 h-7 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <circle
                      className="text-neutral-800"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      r="14"
                      cx="18"
                      cy="18"
                    />
                    <circle
                      className={cn(
                        "transition-all duration-150",
                        charsRemaining < 0
                          ? "text-red-500"
                          : charsRemaining <= 20
                          ? "text-amber-500"
                          : "text-[#1d9bf0]"
                      )}
                      strokeDasharray="88"
                      strokeDashoffset={88 - (88 * percentageUsed) / 100}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      r="14"
                      cx="18"
                      cy="18"
                    />
                  </svg>
                  {charsRemaining <= 20 && (
                    <span
                      className={cn(
                        "absolute text-[10px] font-bold",
                        charsRemaining < 0 ? "text-red-500" : "text-amber-500"
                      )}
                    >
                      {charsRemaining}
                    </span>
                  )}
                </div>
              </div>
            )}

            <Button
              onClick={handleSubmit}
              disabled={
                (!content.trim() && media.length === 0) ||
                content.length > MAX_CHARS ||
                isSubmitting ||
                isUploading
              }
              loading={isSubmitting || isUploading}
              variant="tweet"
              size="sm"
              className="px-5 font-bold h-9 rounded-full"
            >
              {replyToId ? "Reply" : "Post"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
