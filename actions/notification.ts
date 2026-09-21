"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function markNotificationAsReadAction(notificationId: string) {
  const user = await getCurrentUser();
  if (!user) return;

  await db.notification.updateMany({
    where: { id: notificationId, recipientId: user.id },
    data: { isRead: true },
  });

  revalidatePath("/notifications");
}

export async function markAllNotificationsAsReadAction() {
  const user = await getCurrentUser();
  if (!user) return;

  await db.notification.updateMany({
    where: { recipientId: user.id, isRead: false },
    data: { isRead: true },
  });

  revalidatePath("/notifications");
}
