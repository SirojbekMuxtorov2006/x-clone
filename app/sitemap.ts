import type { MetadataRoute } from "next";
import { db } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  // Static routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/explore`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.9,
    },
  ];

  try {
    // Dynamic user profiles
    const users = await db.user.findMany({
      take: 50,
      select: { username: true, updatedAt: true },
    });

    for (const user of users) {
      routes.push({
        url: `${baseUrl}/${user.username}`,
        lastModified: user.updatedAt,
        changeFrequency: "daily",
        priority: 0.8,
      });
    }

    // Dynamic posts
    const posts = await db.post.findMany({
      take: 100,
      select: { id: true, updatedAt: true },
    });

    for (const post of posts) {
      routes.push({
        url: `${baseUrl}/post/${post.id}`,
        lastModified: post.updatedAt,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  } catch {
    // Return static routes if db query fails during build
  }

  return routes;
}
