import { redirect } from "next/navigation";
import { CheckCheck, Bell } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { NotificationItem } from "@/components/notifications/NotificationItem";
import { markAllNotificationsAsReadAction } from "@/actions/notification";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function NotificationsPage() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect("/login");
  }

  const notifications = await db.notification.findMany({
    where: { recipientId: currentUser.id },
    orderBy: { createdAt: "desc" },
    include: {
      issuer: {
        select: {
          id: true,
          name: true,
          username: true,
          image: true,
        },
      },
      post: {
        select: {
          id: true,
          content: true,
        },
      },
    },
  });

  return (
    <AppShell headerTitle="Notifications">
      {/* Header with Mark all as read button */}
      <div className="sticky top-0 z-20 bg-black/80 backdrop-blur-md border-b border-[#2f3336] px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <Bell className="w-5 h-5 text-[#1d9bf0]" /> Notifications
        </h1>

        <form action={markAllNotificationsAsReadAction}>
          <button
            type="submit"
            className="flex items-center gap-1.5 text-xs font-semibold text-[#1d9bf0] hover:text-[#1a8cd8] px-3 py-1.5 rounded-full hover:bg-[#1d9bf0]/10 transition-colors cursor-pointer"
          >
            <CheckCheck className="w-4 h-4" />
            <span>Mark all read</span>
          </button>
        </form>
      </div>

      {/* Notifications List */}
      <div className="divide-y divide-[#2f3336]">
        {notifications.length > 0 ? (
          notifications.map((notif) => (
            <NotificationItem key={notif.id} notification={notif} />
          ))
        ) : (
          <div className="p-12 text-center text-neutral-500">
            <div className="w-14 h-14 rounded-full bg-neutral-900 border border-[#2f3336] flex items-center justify-center mx-auto mb-3">
              <Bell className="w-7 h-7 text-[#1d9bf0]" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">
              Nothing to see here — yet
            </h3>
            <p className="text-xs text-neutral-500 max-w-xs mx-auto">
              From likes to reposts and a whole lot more, this is where all the action about your posts and account will happen.
            </p>
          </div>
        )}
      </div>
    </AppShell>
  );
}
