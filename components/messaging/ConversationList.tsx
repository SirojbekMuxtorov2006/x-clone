"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Plus, Search } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Modal } from "@/components/ui/Modal";
import { formatRelativeTime, cn } from "@/lib/utils";

interface ConversationListProps {
  conversations: Array<{
    id: string;
    updatedAt: Date | string;
    otherUser: {
      id: string;
      name: string | null;
      username: string;
      image: string | null;
    };
    lastMessage?: {
      content: string;
      createdAt: Date | string;
      senderId: string;
    } | null;
    hasUnread: boolean;
  }>;
  activeConversationId?: string;
  availableUsers: Array<{
    id: string;
    name: string | null;
    username: string;
    image: string | null;
  }>;
}

export function ConversationList({
  conversations,
  activeConversationId,
  availableUsers,
}: ConversationListProps) {
  const [isNewMsgModalOpen, setIsNewMsgModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = availableUsers.filter(
    (u) =>
      u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full border-r border-[#2f3336]">
      {/* Messages Header */}
      <div className="p-3.5 border-b border-[#2f3336] flex items-center justify-between">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <Mail className="w-5 h-5 text-[#1d9bf0]" /> Messages
        </h1>
        <button
          onClick={() => setIsNewMsgModalOpen(true)}
          className="p-2 rounded-full hover:bg-neutral-800 text-white transition-colors cursor-pointer"
          aria-label="New message"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto divide-y divide-[#2f3336]/40">
        {conversations.length > 0 ? (
          conversations.map((conv) => {
            const isActive = conv.id === activeConversationId;

            return (
              <Link
                key={conv.id}
                href={`/messages/${conv.id}`}
                className={cn(
                  "p-3.5 flex items-center gap-3 hover:bg-neutral-900/40 transition-colors block",
                  isActive && "bg-neutral-900/60 border-l-2 border-[#1d9bf0]"
                )}
              >
                <div className="relative shrink-0">
                  <Avatar
                    src={conv.otherUser.image}
                    name={conv.otherUser.name}
                    alt={conv.otherUser.username}
                    size="md"
                  />
                  {conv.hasUnread && (
                    <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#1d9bf0] rounded-full ring-2 ring-black" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-bold text-sm text-white truncate max-w-[130px]">
                      {conv.otherUser.name}
                    </span>
                    {conv.lastMessage && (
                      <span className="text-[11px] text-neutral-500">
                        {formatRelativeTime(conv.lastMessage.createdAt)}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-400 truncate">
                    {conv.lastMessage ? conv.lastMessage.content : "Start a conversation"}
                  </p>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="p-8 text-center text-neutral-500 text-sm">
            No conversations yet. Start a new message!
          </div>
        )}
      </div>

      {/* New Message Modal */}
      <Modal
        isOpen={isNewMsgModalOpen}
        onClose={() => setIsNewMsgModalOpen(false)}
        title="New message"
      >
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search people"
              className="w-full bg-neutral-900 border border-[#2f3336] focus:border-[#1d9bf0] rounded-xl pl-10 pr-4 py-2 text-sm text-white outline-none"
            />
          </div>
        </div>

        <div className="divide-y divide-[#2f3336]/40 max-h-72 overflow-y-auto">
          {filteredUsers.map((user) => (
            <Link
              key={user.id}
              href={`/messages?userId=${user.id}`}
              onClick={() => setIsNewMsgModalOpen(false)}
              className="p-3 flex items-center gap-3 hover:bg-neutral-800 rounded-xl transition-colors block"
            >
              <Avatar src={user.image} name={user.name} alt={user.username} size="md" />
              <div>
                <p className="font-bold text-sm text-white">{user.name}</p>
                <p className="text-xs text-neutral-500">@{user.username}</p>
              </div>
            </Link>
          ))}
        </div>
      </Modal>
    </div>
  );
}
