import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Clean existing data
  await prisma.notification.deleteMany();
  await prisma.message.deleteMany();
  await prisma.conversationParticipant.deleteMany();
  await prisma.conversation.deleteMany();
  await prisma.like.deleteMany();
  await prisma.repost.deleteMany();
  await prisma.bookmark.deleteMany();
  await prisma.postMedia.deleteMany();
  await prisma.postHashtag.deleteMany();
  await prisma.post.deleteMany();
  await prisma.hashtag.deleteMany();
  await prisma.follow.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash("password123", 10);

  // 1. Create Users
  const alex = await prisma.user.create({
    data: {
      name: "Alex Rivera",
      username: "alex_dev",
      email: "alex@example.com",
      password: passwordHash,
      bio: "Staff Engineer @ InfraScale. Building scalable distributed systems & open-source tools. Next.js, Rust, PostgreSQL enthusiast. 🚀",
      location: "San Francisco, CA",
      website: "https://alexrivera.dev",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
    },
  });

  const sarah = await prisma.user.create({
    data: {
      name: "Sarah Chen",
      username: "sarah_design",
      email: "sarah@example.com",
      password: passwordHash,
      bio: "Design Systems Architect. Obsessed with micro-interactions, dark mode aesthetics, and typographic hierarchy. ✨",
      location: "Seattle, WA",
      website: "https://sarahchen.design",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80",
      coverImage: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1200&auto=format&fit=crop&q=80",
    },
  });

  const nextInsider = await prisma.user.create({
    data: {
      name: "Next.js Insider",
      username: "nextjs_insider",
      email: "insider@nextjs.org",
      password: passwordHash,
      bio: "Curating the latest innovations across React 19, Server Actions, Turbopack, and the modern web. ⚡️",
      location: "San Francisco, CA",
      website: "https://nextjs.org",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80",
      coverImage: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&auto=format&fit=crop&q=80",
    },
  });

  const elena = await prisma.user.create({
    data: {
      name: "Elena Rostova",
      username: "elena_ai",
      email: "elena@deepmind.ai",
      password: passwordHash,
      bio: "AI Research Scientist working on reasoning models and agentic workflows. Writing about multi-agent alignment. 🤖",
      location: "London, UK",
      website: "https://elena-ai.research",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
      coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80",
    },
  });

  const marcus = await prisma.user.create({
    data: {
      name: "Marcus Vance",
      username: "marcus_vance",
      email: "marcus@vance.io",
      password: passwordHash,
      bio: "Building developer tooling. Bootstrapped from $0 to $10M ARR. Sharing everything we learned along the way. 📈",
      location: "Austin, TX",
      website: "https://vance.io",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
      coverImage: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1200&auto=format&fit=crop&q=80",
    },
  });

  const demoUser = await prisma.user.create({
    data: {
      name: "Demo User",
      username: "demo_user",
      email: "demo@example.com",
      password: passwordHash,
      bio: "Exploring the new X experience! Tech lover, developer, and builder. 🚀",
      location: "San Francisco, CA",
      website: "https://github.com",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80",
      coverImage: "https://images.unsplash.com/photo-1557683316-973673baf926?w=1200&auto=format&fit=crop&q=80",
    },
  });

  console.log("Users created.");

  // 2. Create Follow relationships
  const follows = [
    { followerId: demoUser.id, followingId: alex.id },
    { followerId: demoUser.id, followingId: sarah.id },
    { followerId: demoUser.id, followingId: nextInsider.id },
    { followerId: alex.id, followingId: sarah.id },
    { followerId: alex.id, followingId: nextInsider.id },
    { followerId: sarah.id, followingId: alex.id },
    { followerId: sarah.id, followingId: elena.id },
    { followerId: nextInsider.id, followingId: alex.id },
    { followerId: elena.id, followingId: alex.id },
    { followerId: marcus.id, followingId: demoUser.id },
    { followerId: alex.id, followingId: demoUser.id },
  ];

  for (const follow of follows) {
    await prisma.follow.create({ data: follow });
  }

  // 3. Create Hashtags
  const hashtagsList = ["nextjs", "webdev", "typescript", "designsystems", "ai", "react19", "buildinpublic"];
  const hashtagMap = new Map<string, string>();

  for (const tag of hashtagsList) {
    const createdTag = await prisma.hashtag.create({
      data: { name: tag },
    });
    hashtagMap.set(tag, createdTag.id);
  }

  // Helper to attach hashtags
  const linkHashtags = async (postId: string, tags: string[]) => {
    for (const tag of tags) {
      const tagId = hashtagMap.get(tag);
      if (tagId) {
        await prisma.postHashtag.create({
          data: { postId, hashtagId: tagId },
        });
      }
    }
  };

  // 4. Create Posts
  const post1 = await prisma.post.create({
    data: {
      authorId: alex.id,
      content: "Just deployed our new real-time architecture built on PostgreSQL and Next.js App Router. Sub-10ms response times globally. Clean architecture always pays off in the long run. #nextjs #webdev #typescript",
      viewCount: 4210,
      createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
    },
  });
  await linkHashtags(post1.id, ["nextjs", "webdev", "typescript"]);

  const post2 = await prisma.post.create({
    data: {
      authorId: sarah.id,
      content: "Design tip: Don't design dark mode by simply inverting your light mode palette. Pure pitch blacks (#000000) combined with subtle 1px border dividers (#2f3336) create an ultra-luxurious feel. Here is what we crafted for our latest release: #designsystems",
      viewCount: 8940,
      createdAt: new Date(Date.now() - 1000 * 60 * 90), // 1.5 hrs ago
      media: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&auto=format&fit=crop&q=80",
            type: "image",
            order: 0,
          },
          {
            url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1000&auto=format&fit=crop&q=80",
            type: "image",
            order: 1,
          },
        ],
      },
    },
  });
  await linkHashtags(post2.id, ["designsystems"]);

  const post3 = await prisma.post.create({
    data: {
      authorId: nextInsider.id,
      content: "React 19 Server Actions paired with optimistic UI updates make full-stack web applications feel instant. No loading spinners required for micro-interactions like likes and bookmarks. 🚀 #react19 #nextjs",
      viewCount: 15420,
      createdAt: new Date(Date.now() - 1000 * 60 * 180), // 3 hrs ago
    },
  });
  await linkHashtags(post3.id, ["react19", "nextjs"]);

  const post4 = await prisma.post.create({
    data: {
      authorId: elena.id,
      content: "Exciting breakthrough in autonomous agent reasoning: multi-step reflection loops reduce hallucinations by 74% on complex code synthesis benchmarks. The future of software engineering is pair-programming with tireless intelligence. #ai",
      viewCount: 22800,
      createdAt: new Date(Date.now() - 1000 * 60 * 360), // 6 hrs ago
    },
  });
  await linkHashtags(post4.id, ["ai"]);

  const post5 = await prisma.post.create({
    data: {
      authorId: marcus.id,
      content: "We crossed $10M ARR today! 🎉\n\nStarted 3 years ago with just 2 founders in a tiny apartment. Here are the 3 biggest lessons:\n\n1. Obsess over developer experience\n2. Talk to 5 customers every single week\n3. Ship daily, iterate constantly\n\n#buildinpublic",
      viewCount: 31200,
      createdAt: new Date(Date.now() - 1000 * 60 * 600), // 10 hrs ago
    },
  });
  await linkHashtags(post5.id, ["buildinpublic"]);

  // 5. Threaded Replies
  const reply1 = await prisma.post.create({
    data: {
      authorId: sarah.id,
      content: "@alex_dev The performance difference is night and day! Did you measure the p99 latency during peak traffic spikes?",
      replyToId: post1.id,
      createdAt: new Date(Date.now() - 1000 * 60 * 20),
    },
  });

  await prisma.post.create({
    data: {
      authorId: alex.id,
      content: "@sarah_design p99 stayed firmly under 18ms even during a 5x spike. Proper connection pooling and composite index optimization made all the difference.",
      replyToId: reply1.id,
      createdAt: new Date(Date.now() - 1000 * 60 * 10),
    },
  });

  const reply3 = await prisma.post.create({
    data: {
      authorId: demoUser.id,
      content: "@sarah_design This dark mode palette looks incredible. The contrast ratio is spot on!",
      replyToId: post2.id,
      createdAt: new Date(Date.now() - 1000 * 60 * 45),
    },
  });

  // 6. Quote Tweet
  await prisma.post.create({
    data: {
      authorId: alex.id,
      content: "Couldn't agree more with @sarah_design here. Typography and micro-spacing are what separate standard tools from world-class platforms. Highly recommend studying this! 👇",
      quoteOfId: post2.id,
      createdAt: new Date(Date.now() - 1000 * 60 * 60),
    },
  });

  // 7. Likes
  await prisma.like.create({ data: { userId: demoUser.id, postId: post1.id } });
  await prisma.like.create({ data: { userId: demoUser.id, postId: post2.id } });
  await prisma.like.create({ data: { userId: sarah.id, postId: post1.id } });
  await prisma.like.create({ data: { userId: alex.id, postId: post2.id } });
  await prisma.like.create({ data: { userId: nextInsider.id, postId: post1.id } });
  await prisma.like.create({ data: { userId: alex.id, postId: post3.id } });
  await prisma.like.create({ data: { userId: demoUser.id, postId: post5.id } });

  // 8. Reposts
  await prisma.repost.create({ data: { userId: demoUser.id, postId: post3.id } });
  await prisma.repost.create({ data: { userId: alex.id, postId: post2.id } });
  await prisma.repost.create({ data: { userId: sarah.id, postId: post5.id } });

  // 9. Bookmarks
  await prisma.bookmark.create({ data: { userId: demoUser.id, postId: post2.id } });
  await prisma.bookmark.create({ data: { userId: demoUser.id, postId: post4.id } });

  // 10. Notifications
  await prisma.notification.create({
    data: {
      type: "LIKE",
      recipientId: alex.id,
      issuerId: demoUser.id,
      postId: post1.id,
      createdAt: new Date(Date.now() - 1000 * 60 * 15),
    },
  });

  await prisma.notification.create({
    data: {
      type: "FOLLOW",
      recipientId: alex.id,
      issuerId: demoUser.id,
      createdAt: new Date(Date.now() - 1000 * 60 * 25),
    },
  });

  await prisma.notification.create({
    data: {
      type: "REPLY",
      recipientId: post2.authorId,
      issuerId: demoUser.id,
      postId: reply3.id,
      createdAt: new Date(Date.now() - 1000 * 60 * 45),
    },
  });

  await prisma.notification.create({
    data: {
      type: "REPOST",
      recipientId: nextInsider.id,
      issuerId: demoUser.id,
      postId: post3.id,
      createdAt: new Date(Date.now() - 1000 * 60 * 50),
    },
  });

  // 11. Direct Messages
  const conversation = await prisma.conversation.create({
    data: {},
  });

  await prisma.conversationParticipant.create({
    data: {
      conversationId: conversation.id,
      userId: demoUser.id,
    },
  });

  await prisma.conversationParticipant.create({
    data: {
      conversationId: conversation.id,
      userId: alex.id,
    },
  });

  await prisma.message.create({
    data: {
      conversationId: conversation.id,
      senderId: alex.id,
      content: "Hey! Loved your feedback on the new architecture release. Let me know if you want to collaborate on the upcoming open-source library!",
      createdAt: new Date(Date.now() - 1000 * 60 * 120),
    },
  });

  await prisma.message.create({
    data: {
      conversationId: conversation.id,
      senderId: demoUser.id,
      content: "Hey Alex! Definitely, I would love to contribute. The sub-10ms latency is really impressive.",
      createdAt: new Date(Date.now() - 1000 * 60 * 115),
    },
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
