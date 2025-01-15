import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { LyricsProvider } from "@/context/LyricsContext";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/toaster";
import { useSession } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BlueCocain : A Lyrics Library",
  description:
    "A Lyrics Library For Free, where you can find lyrics of all songs, Made by indian",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <LyricsProvider>
          <body
            className={`${inter.className} bg-gradient-to-br from-gray-900 via-purple-950 to-black`}
          >
            <Navbar />
            {children}
            <Toaster />
          </body>
        </LyricsProvider>
      </AuthProvider>
    </html>
  );
}
