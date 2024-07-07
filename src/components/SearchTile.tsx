import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils"; // Utility function to combine class names
import Image from "next/image";

export type SearchResultType = {
  _id?: string;
  songName: string;
  singer: { _id?: string; name: string }; // Reference to the Artist model
  albumName?: string;
  genre?: string;
  releaseDate?: Date;
  albumArt?: string;
};

const SearchTile = ({ item }: { item: SearchResultType }) => {
  return (
    <Link
      href={`/lyrics/${item._id}`}
      className={cn(
        "flex flex-col bg-purple-950 shadow-xl rounded-lg overflow-hidden border border-gray-700 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl",
        "hover:bg-gray-700 w-full max-w-lg mx-auto"
      )}
    >
      <div className="flex">
        <div className="flex-shrink-0 w-1/3">
          <img
            src={item.albumArt}
            alt={`${item.albumName} cover`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-between p-4 w-2/3">
          <div>
            <h1 className="text-lg font-bold text-white">{item.songName}</h1>
            <h2 className="text-md text-gray-300">{item.albumName}</h2>
            <p className="text-sm text-gray-400">{item.genre}</p>
          </div>
          <div className="mt-2">
            <h3 className="text-base font-medium text-gray-200">
              {item.singer.name}
            </h3>
            <p className="text-sm text-gray-400">
              {item.releaseDate &&
                new Date(item.releaseDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchTile;
