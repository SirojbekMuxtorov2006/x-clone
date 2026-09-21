import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name cannot exceed 50 characters"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username cannot exceed 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores")
    .transform((val) => val.toLowerCase()),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  login: z.string().min(1, "Please enter your username or email"),
  password: z.string().min(1, "Please enter your password"),
});

export const postSchema = z.object({
  content: z
    .string()
    .max(280, "Posts cannot exceed 280 characters")
    .refine((val) => val.trim().length > 0, "Post cannot be empty"),
  replyToId: z.string().optional(),
  quoteOfId: z.string().optional(),
  media: z
    .array(
      z.object({
        url: z.string().url(),
        type: z.enum(["image", "gif", "video"]).default("image"),
      })
    )
    .max(4, "You can attach up to 4 media items")
    .optional(),
});

export const profileSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name cannot exceed 50 characters"),
  bio: z.string().max(160, "Bio cannot exceed 160 characters").optional().or(z.literal("")),
  location: z.string().max(30, "Location cannot exceed 30 characters").optional().or(z.literal("")),
  website: z
    .string()
    .max(100, "Website cannot exceed 100 characters")
    .optional()
    .or(z.literal("")),
  image: z.string().optional().or(z.literal("")),
  coverImage: z.string().optional().or(z.literal("")),
});

export const messageSchema = z.object({
  recipientId: z.string().min(1),
  content: z.string().min(1, "Message cannot be empty").max(1000, "Message cannot exceed 1000 characters"),
});
