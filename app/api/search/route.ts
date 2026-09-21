import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim() || "";

  if (!q) {
    return NextResponse.json({ users: [], hashtags: [], posts: [] });
  }

  try {
    const cleanQ = q.startsWith("#") ? q.slice(1) : q.startsWith("@") ? q.slice(1) : q;

    const [users, hashtags, posts] = await Promise.all([
      db.user.findMany({
        where: {
          OR: [
            { username: { contains: cleanQ, mode: "insensitive" } },
            { name: { contains: cleanQ, mode: "insensitive" } },
          ],
        },
        take: 5,
        select: {
          id: true,
          name: true,
          username: true,
          image: true,
          bio: true,
        },
      }),
      db.hashtag.findMany({
        where: {
          name: { contains: cleanQ, mode: "insensitive" },
        },
        take: 5,
        include: {
          _count: {
            select: { posts: true },
          },
        },
      }),
      db.post.findMany({
        where: {
          content: { contains: q, mode: "insensitive" },
        },
        take: 5,
        include: {
          author: true,
          media: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
    ]);

    return NextResponse.json({ users, hashtags, posts });
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json({ error: "Failed to search" }, { status: 500 });
  }
}
