"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { profileSchema } from "@/lib/validations";

export async function toggleFollowAction(targetUserId: string) {
  const user = await getCurrentUser();
  if (!user) {
    return { error: "You must be logged in to follow users." };
  }

  if (user.id === targetUserId) {
    return { error: "You cannot follow yourself." };
  }

  const existingFollow = await db.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId: user.id,
        followingId: targetUserId,
      },
    },
  });

  if (existingFollow) {
    await db.follow.delete({
      where: { id: existingFollow.id },
    });

    const target = await db.user.findUnique({
      where: { id: targetUserId },
      select: { username: true },
    });
    if (target) revalidatePath(`/${target.username}`);
    revalidatePath(`/${user.username}`);

    return { success: true, isFollowing: false };
  } else {
    await db.follow.create({
      data: {
        followerId: user.id,
        followingId: targetUserId,
      },
    });

    // Create notification
    await db.notification.create({
      data: {
        type: "FOLLOW",
        recipientId: targetUserId,
        issuerId: user.id,
      },
    });

    const target = await db.user.findUnique({
      where: { id: targetUserId },
      select: { username: true },
    });
    if (target) revalidatePath(`/${target.username}`);
    revalidatePath(`/${user.username}`);

    return { success: true, isFollowing: true };
  }
}

export async function updateProfileAction(data: {
  name: string;
  bio?: string;
  location?: string;
  website?: string;
  image?: string;
  coverImage?: string;
}) {
  const user = await getCurrentUser();
  if (!user) {
    return { error: "Unauthorized." };
  }

  const parsed = profileSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message || "Invalid profile data" };
  }

  const updatedUser = await db.user.update({
    where: { id: user.id },
    data: {
      name: parsed.data.name,
      bio: parsed.data.bio || null,
      location: parsed.data.location || null,
      website: parsed.data.website || null,
      image: parsed.data.image || user.image,
      coverImage: parsed.data.coverImage || user.coverImage,
    },
  });

  revalidatePath(`/${user.username}`);
  revalidatePath(`/settings`);

  return { success: true, user: updatedUser };
}
