import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar";
import { LyricsProvider } from "@/context/LyricsContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lyr!csForYou : A Lyrics Library",
  description:
    "A Lyrics Library For Free, where you can find lyrics of all songs, Made by indian",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LyricsProvider>
      <html lang="en">
        {/* <SessionProvider > */}
        <body className={inter.className}>
          <Navbar />
          {children}
        </body>
        {/* </SessionProvider> */}
      </html>
    </LyricsProvider>
  );
}
