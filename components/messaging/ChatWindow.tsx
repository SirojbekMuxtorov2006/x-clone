"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Send, ArrowLeft } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { sendMessageAction, markConversationAsReadAction } from "@/actions/message";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  senderId: string;
  content: string;
  createdAt: Date | string;
  sender?: {
    id: string;
    name: string | null;
    username: string;
    image: string | null;
  };
}

interface ChatWindowProps {
  conversationId: string;
  otherUser: {
    id: string;
    name: string | null;
    username: string;
    image: string | null;
  };
  currentUser: {
    id: string;
    name: string | null;
    username: string;
    image: string | null;
  };
  initialMessages: Message[];
}

export function ChatWindow({
  conversationId,
  otherUser,
  currentUser,
  initialMessages,
}: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputContent, setInputContent] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    markConversationAsReadAction(conversationId);
  }, [conversationId, messages]);

  // Polling for real-time messages every 3 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/messages?conversationId=${conversationId}`);
        const data = await res.json();
        if (data.messages) {
          setMessages(data.messages);
        }
      } catch {
        // silent poll failure
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [conversationId]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputContent.trim() || isSending) return;

    const optimisticContent = inputContent.trim();
    setInputContent("");

    // Optimistic message
    const tempId = `temp-${Date.now()}`;
    const optimisticMessage: Message = {
      id: tempId,
      senderId: currentUser.id,
      content: optimisticContent,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, optimisticMessage]);

    setIsSending(true);
    try {
      const res = await sendMessageAction({
        recipientId: otherUser.id,
        content: optimisticContent,
      });

      if (res.success && res.message) {
        setMessages((prev) =>
          prev.map((m) => (m.id === tempId ? (res.message as Message) : m))
        );
      }
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-black">
      {/* Chat Header */}
      <div className="p-3.5 border-b border-[#2f3336] flex items-center justify-between bg-black/80 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <Link
            href="/messages"
            className="md:hidden p-1.5 rounded-full hover:bg-neutral-800 text-neutral-400"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <Link
            href={`/${otherUser.username}`}
            className="flex items-center gap-2.5 group"
          >
            <Avatar
              src={otherUser.image}
              name={otherUser.name}
              alt={otherUser.username}
              size="sm"
            />
            <div>
              <p className="font-bold text-sm text-white group-hover:underline">
                {otherUser.name}
              </p>
              <p className="text-xs text-neutral-500">@{otherUser.username}</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => {
          const isMe = msg.senderId === currentUser.id;
          const time = format(new Date(msg.createdAt), "h:mm a");

          return (
            <div
              key={msg.id}
              className={cn("flex flex-col", isMe ? "items-end" : "items-start")}
            >
              <div
                className={cn(
                  "max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed",
                  isMe
                    ? "bg-[#1d9bf0] text-white rounded-br-xs"
                    : "bg-[#202327] text-[#e7e9ea] rounded-bl-xs"
                )}
              >
                {msg.content}
              </div>
              <span className="text-[10px] text-neutral-500 mt-1 px-1">{time}</span>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={handleSend}
        className="p-3 border-t border-[#2f3336] flex items-center gap-2 bg-black"
      >
        <input
          type="text"
          value={inputContent}
          onChange={(e) => setInputContent(e.target.value)}
          placeholder="Start a new message"
          className="flex-1 bg-neutral-900 border border-[#2f3336] focus:border-[#1d9bf0] rounded-full px-4 py-2.5 text-sm text-white placeholder-neutral-500 outline-none"
        />
        <button
          type="submit"
          disabled={!inputContent.trim() || isSending}
          className="p-2.5 rounded-full bg-[#1d9bf0] text-white hover:bg-[#1a8cd8] disabled:opacity-40 transition-colors cursor-pointer"
          aria-label="Send message"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
