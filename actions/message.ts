"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { messageSchema } from "@/lib/validations";
import { rateLimit } from "@/lib/rate-limit";

export async function sendMessageAction(data: { recipientId: string; content: string }) {
  const user = await getCurrentUser();
  if (!user) {
    return { error: "Unauthorized." };
  }

  const rateCheck = rateLimit(`msg:${user.id}`, { limit: 40, windowMs: 60 * 1000 });
  if (!rateCheck.success) {
    return { error: `Sending messages too fast. Please wait ${rateCheck.reset} seconds.` };
  }

  const parsed = messageSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message || "Invalid message" };
  }

  const { recipientId, content } = parsed.data;

  // Find existing conversation between the two users
  const existingConv = await db.conversation.findFirst({
    where: {
      AND: [
        { participants: { some: { userId: user.id } } },
        { participants: { some: { userId: recipientId } } },
      ],
    },
    include: {
      participants: true,
    },
  });

  let conversationId = existingConv?.id;

  if (!conversationId) {
    const newConv = await db.conversation.create({
      data: {
        participants: {
          create: [
            { userId: user.id, hasSeenLatest: true },
            { userId: recipientId, hasSeenLatest: false },
          ],
        },
      },
    });
    conversationId = newConv.id;
  } else {
    // Update participant seen status
    await db.conversationParticipant.updateMany({
      where: { conversationId, userId: recipientId },
      data: { hasSeenLatest: false },
    });
    await db.conversationParticipant.updateMany({
      where: { conversationId, userId: user.id },
      data: { hasSeenLatest: true },
    });
  }

  const message = await db.message.create({
    data: {
      conversationId,
      senderId: user.id,
      content,
    },
    include: {
      sender: true,
    },
  });

  await db.conversation.update({
    where: { id: conversationId },
    data: { updatedAt: new Date() },
  });

  revalidatePath(`/messages`);
  revalidatePath(`/messages/${conversationId}`);

  return { success: true, message, conversationId };
}

export async function markConversationAsReadAction(conversationId: string) {
  const user = await getCurrentUser();
  if (!user) return;

  await db.conversationParticipant.updateMany({
    where: { conversationId, userId: user.id },
    data: { hasSeenLatest: true },
  });

  await db.message.updateMany({
    where: {
      conversationId,
      senderId: { not: user.id },
      isRead: false,
    },
    data: { isRead: true },
  });

  revalidatePath("/messages");
}
