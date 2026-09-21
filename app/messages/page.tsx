import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { ConversationList } from "@/components/messaging/ConversationList";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { Mail } from "lucide-react";

interface MessagesPageProps {
  searchParams: Promise<{ userId?: string }>;
}

export default async function MessagesPage({ searchParams }: MessagesPageProps) {
  const { userId } = await searchParams;
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect("/login");
  }

  // If userId query param is provided, find or start conversation
  if (userId && userId !== currentUser.id) {
    const existing = await db.conversation.findFirst({
      where: {
        AND: [
          { participants: { some: { userId: currentUser.id } } },
          { participants: { some: { userId } } },
        ],
      },
    });

    if (existing) {
      redirect(`/messages/${existing.id}`);
    } else {
      const newConv = await db.conversation.create({
        data: {
          participants: {
            create: [
              { userId: currentUser.id, hasSeenLatest: true },
              { userId: userId, hasSeenLatest: false },
            ],
          },
        },
      });
      redirect(`/messages/${newConv.id}`);
    }
  }

  // Fetch current user's conversations
  const rawConversations = await db.conversation.findMany({
    where: {
      participants: {
        some: { userId: currentUser.id },
      },
    },
    orderBy: { updatedAt: "desc" },
    include: {
      participants: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              username: true,
              image: true,
            },
          },
        },
      },
      messages: {
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
  });

  const formattedConversations = rawConversations.map((c) => {
    const otherParticipant = c.participants.find((p) => p.userId !== currentUser.id);
    const myParticipant = c.participants.find((p) => p.userId === currentUser.id);
    return {
      id: c.id,
      updatedAt: c.updatedAt,
      otherUser: otherParticipant?.user || {
        id: "deleted",
        name: "Unknown User",
        username: "unknown",
        image: null,
      },
      lastMessage: c.messages[0] || null,
      hasUnread: myParticipant ? !myParticipant.hasSeenLatest : false,
    };
  });

  // Fetch all users for starting a new chat
  const availableUsers = await db.user.findMany({
    where: { id: { not: currentUser.id } },
    take: 20,
    select: {
      id: true,
      name: true,
      username: true,
      image: true,
    },
  });

  return (
    <AppShell headerTitle="Messages" hideRightSidebar>
      <div className="grid grid-cols-1 md:grid-cols-12 h-[calc(100vh-60px)] md:h-screen">
        {/* Left: Conversation List */}
        <div className="md:col-span-5 h-full overflow-hidden">
          <ConversationList
            conversations={formattedConversations}
            availableUsers={availableUsers}
          />
        </div>

        {/* Right: Empty chat selection placeholder (Desktop) */}
        <div className="hidden md:flex md:col-span-7 flex-col items-center justify-center p-8 text-center text-neutral-500 bg-black">
          <div className="w-16 h-16 rounded-full bg-neutral-900 border border-[#2f3336] flex items-center justify-center mb-3">
            <Mail className="w-8 h-8 text-[#1d9bf0]" />
          </div>
          <h2 className="text-xl font-bold text-white mb-1">
            Select a message
          </h2>
          <p className="text-xs text-neutral-500 max-w-xs">
            Choose from your existing conversations, or start a new one to chat directly.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
