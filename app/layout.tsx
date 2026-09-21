import type { Metadata, Viewport } from "next";
import { ToastProvider } from "@/components/ui/Toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "X · It's what's happening",
  description: "A production-quality social media platform built with Next.js 16, TypeScript, PostgreSQL, and Prisma.",
  keywords: ["X", "Twitter", "Social Media", "Next.js", "React 19", "Prisma", "PostgreSQL"],
  openGraph: {
    title: "X · It's what's happening",
    description: "Full-stack social media web application inspired by X/Twitter.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "X · It's what's happening",
    description: "Full-stack social media web application inspired by X/Twitter.",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark h-full">
      <body className="bg-black text-[#e7e9ea] min-h-full antialiased selection:bg-[#1d9bf0]/30 selection:text-white">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
