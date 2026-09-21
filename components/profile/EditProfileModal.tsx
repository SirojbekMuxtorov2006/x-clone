"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Camera, X } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { useToast } from "@/components/ui/Toast";
import { updateProfileAction } from "@/actions/user";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    name: string | null;
    bio: string | null;
    location: string | null;
    website: string | null;
    image: string | null;
    coverImage: string | null;
  };
}

export function EditProfileModal({ isOpen, onClose, user }: EditProfileModalProps) {
  const { toast } = useToast();
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(user.name || "");
  const [bio, setBio] = useState(user.bio || "");
  const [location, setLocation] = useState(user.location || "");
  const [website, setWebsite] = useState(user.website || "");
  const [image, setImage] = useState(user.image || "");
  const [coverImage, setCoverImage] = useState(user.coverImage || "");
  const [isSaving, setIsSaving] = useState(false);

  const handleFileUpload = async (
    file: File,
    type: "avatar" | "cover"
  ) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        if (type === "avatar") setImage(data.url);
        if (type === "cover") setCoverImage(data.url);
        toast(`${type === "avatar" ? "Avatar" : "Cover"} uploaded`, "success");
      } else {
        toast(data.error || "Upload failed", "error");
      }
    } catch {
      toast("Upload failed", "error");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast("Name cannot be blank", "error");
      return;
    }

    setIsSaving(true);
    try {
      const res = await updateProfileAction({
        name: name.trim(),
        bio: bio.trim(),
        location: location.trim(),
        website: website.trim(),
        image,
        coverImage,
      });

      if (res.success) {
        toast("Profile updated successfully", "success");
        onClose();
      } else {
        toast(res.error || "Failed to update profile", "error");
      }
    } catch {
      toast("Failed to update profile", "error");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit profile">
      <form onSubmit={handleSave} className="space-y-4">
        {/* Cover Photo Editor */}
        <div className="relative h-36 w-full bg-neutral-800 rounded-xl overflow-hidden group">
          {coverImage ? (
            <Image
              src={coverImage}
              alt="Cover preview"
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-linear-to-r from-blue-900 to-indigo-900" />
          )}

          <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-3">
            <input
              ref={coverInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file, "cover");
              }}
            />
            <button
              type="button"
              onClick={() => coverInputRef.current?.click()}
              className="p-2.5 rounded-full bg-black/60 hover:bg-black text-white transition-colors cursor-pointer"
              aria-label="Upload cover"
            >
              <Camera className="w-5 h-5" />
            </button>
            {coverImage && (
              <button
                type="button"
                onClick={() => setCoverImage("")}
                className="p-2.5 rounded-full bg-black/60 hover:bg-black text-white transition-colors cursor-pointer"
                aria-label="Remove cover"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Avatar Photo Editor */}
        <div className="relative -mt-16 ml-4 w-20 h-20 rounded-full ring-4 ring-black overflow-hidden group">
          <Avatar src={image} name={name} size="xl" className="w-full h-full" />
          <input
            ref={avatarInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileUpload(file, "avatar");
            }}
          />
          <div
            onClick={() => avatarInputRef.current?.click()}
            className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          >
            <Camera className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Form Inputs */}
        <div className="space-y-3 pt-2">
          <div>
            <label className="block text-xs font-semibold text-neutral-400 mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={50}
              required
              className="w-full bg-transparent border border-[#2f3336] focus:border-[#1d9bf0] rounded-xl px-3 py-2 text-sm text-white outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-400 mb-1">
              Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength={160}
              rows={3}
              className="w-full bg-transparent border border-[#2f3336] focus:border-[#1d9bf0] rounded-xl px-3 py-2 text-sm text-white outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-400 mb-1">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              maxLength={30}
              placeholder="e.g. San Francisco, CA"
              className="w-full bg-transparent border border-[#2f3336] focus:border-[#1d9bf0] rounded-xl px-3 py-2 text-sm text-white outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-400 mb-1">
              Website
            </label>
            <input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              maxLength={100}
              placeholder="https://yourwebsite.com"
              className="w-full bg-transparent border border-[#2f3336] focus:border-[#1d9bf0] rounded-xl px-3 py-2 text-sm text-white outline-none"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-[#2f3336] flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={onClose}
            className="rounded-full font-bold"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="secondary"
            size="md"
            loading={isSaving}
            className="rounded-full font-bold px-6"
          >
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
}
