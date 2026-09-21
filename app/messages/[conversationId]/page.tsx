import { notFound, redirect } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { ConversationList } from "@/components/messaging/ConversationList";
import { ChatWindow } from "@/components/messaging/ChatWindow";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

interface ConversationPageProps {
  params: Promise<{ conversationId: string }>;
}

export default async function ConversationPage({ params }: ConversationPageProps) {
  const { conversationId } = await params;
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect("/login");
  }

  // Verify conversation exists and user is a participant
  const conversation = await db.conversation.findUnique({
    where: { id: conversationId },
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
        orderBy: { createdAt: "asc" },
        include: {
          sender: {
            select: {
              id: true,
              name: true,
              username: true,
              image: true,
            },
          },
        },
      },
    },
  });

  if (!conversation) {
    notFound();
  }

  const isParticipant = conversation.participants.some((p) => p.userId === currentUser.id);
  if (!isParticipant) {
    redirect("/messages");
  }

  const otherParticipant = conversation.participants.find((p) => p.userId !== currentUser.id);
  const otherUser = otherParticipant?.user || {
    id: "unknown",
    name: "Unknown",
    username: "unknown",
    image: null,
  };

  // Fetch all user conversations for sidebar
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
    const oUser = c.participants.find((p) => p.userId !== currentUser.id)?.user;
    const myParticipant = c.participants.find((p) => p.userId === currentUser.id);
    return {
      id: c.id,
      updatedAt: c.updatedAt,
      otherUser: oUser || {
        id: "deleted",
        name: "Unknown",
        username: "unknown",
        image: null,
      },
      lastMessage: c.messages[0] || null,
      hasUnread: myParticipant ? !myParticipant.hasSeenLatest : false,
    };
  });

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
    <AppShell headerTitle={otherUser.name || "Chat"} hideRightSidebar>
      <div className="grid grid-cols-1 md:grid-cols-12 h-[calc(100vh-60px)] md:h-screen">
        {/* Left: Conversation List (hidden on small mobile screens when chat is open) */}
        <div className="hidden md:block md:col-span-5 h-full overflow-hidden">
          <ConversationList
            conversations={formattedConversations}
            activeConversationId={conversationId}
            availableUsers={availableUsers}
          />
        </div>

        {/* Right: Active Chat Window */}
        <div className="col-span-1 md:col-span-7 h-full overflow-hidden">
          <ChatWindow
            conversationId={conversationId}
            otherUser={otherUser}
            currentUser={currentUser}
            initialMessages={conversation.messages}
          />
        </div>
      </div>
    </AppShell>
  );
}
