"use client";
import Link from "next/link";
import React from "react";

const LibraryPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Library</h1>
      <div className="flex flex-col gap-8">
        <Link
          href="/Library/AllAlbums"
          className="bg-blue-600 hover:bg-blue-700 transition-colors duration-300 text-white py-4 px-6 rounded-lg text-xl font-semibold text-center shadow-lg"
        >
          Explore All Albums
        </Link>
        <Link
          href="/Library/AllArtists"
          className="bg-green-600 hover:bg-green-700 transition-colors duration-300 text-white py-4 px-6 rounded-lg text-xl font-semibold text-center shadow-lg"
        >
          Explore All Artists
        </Link>
        <Link
          href="/Library/AllLyrics"
          className="bg-purple-600 hover:bg-purple-700 transition-colors duration-300 text-white py-4 px-6 rounded-lg text-xl font-semibold text-center shadow-lg"
        >
          Explore All Lyrics
        </Link>
      </div>
    </div>
  );
};

export default LibraryPage;
