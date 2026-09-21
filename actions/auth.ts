"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { setAuthSession, clearAuthSession } from "@/lib/auth";
import { loginSchema, registerSchema } from "@/lib/validations";
import { rateLimit } from "@/lib/rate-limit";

export async function loginAction(prevState: unknown, formData: FormData) {
  const rawData = {
    login: formData.get("login") as string,
    password: formData.get("password") as string,
  };

  const parsed = loginSchema.safeParse(rawData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message || "Invalid input" };
  }

  const { login, password } = parsed.data;

  // Rate limiting by login handle/email
  const limitCheck = rateLimit(`login:${login.toLowerCase()}`, { limit: 10, windowMs: 60 * 1000 });
  if (!limitCheck.success) {
    return { error: `Too many login attempts. Please try again in ${limitCheck.reset} seconds.` };
  }

  const user = await db.user.findFirst({
    where: {
      OR: [
        { email: { equals: login.toLowerCase(), mode: "insensitive" } },
        { username: { equals: login.toLowerCase(), mode: "insensitive" } },
      ],
    },
  });

  if (!user || !user.password) {
    return { error: "Invalid username/email or password." };
  }

  const passwordsMatch = await bcrypt.compare(password, user.password);
  if (!passwordsMatch) {
    return { error: "Invalid username/email or password." };
  }

  await setAuthSession(user.id);
  redirect("/");
}

export async function registerAction(prevState: unknown, formData: FormData) {
  const rawData = {
    name: formData.get("name") as string,
    username: formData.get("username") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const parsed = registerSchema.safeParse(rawData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message || "Invalid input" };
  }

  const { name, username, email, password } = parsed.data;

  // Rate limiting registration
  const limitCheck = rateLimit(`register:ip`, { limit: 5, windowMs: 60 * 1000 });
  if (!limitCheck.success) {
    return { error: "Too many registrations. Please try again in a minute." };
  }

  const existingUsername = await db.user.findUnique({
    where: { username },
  });

  if (existingUsername) {
    return { error: "Username is already taken. Please choose another." };
  }

  const existingEmail = await db.user.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (existingEmail) {
    return { error: "An account with this email already exists." };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await db.user.create({
    data: {
      name,
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
      image: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80`,
    },
  });

  await setAuthSession(newUser.id);
  redirect("/");
}

export async function logoutAction() {
  await clearAuthSession();
  redirect("/login");
}

export async function demoLoginAction(username: string) {
  const user = await db.user.findUnique({
    where: { username },
  });

  if (!user) {
    return { error: "Demo user not found." };
  }

  await setAuthSession(user.id);
  redirect("/");
}
