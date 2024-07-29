import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils"; // Utility function to combine class names

export type SearchResultType = {
  _id?: string;
  songName: string;
  singer: { _id: string; name: string }; // Reference to the Artist model
  albumDetails?: { _id: string; albumArt: string; albumName: string };
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
        "flex flex-col h-fit bg-purple-950 shadow-xl rounded-lg overflow-hidden border border-gray-700 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl",
        "hover:bg-gray-700 w-full max-w-lg mx-auto"
      )}
    >
      <div className="flex">
        <div className="flex-shrink-0 w-1/3 relative">
          <img
            src={item.albumArt || item.albumDetails?.albumArt}
            alt={`${item.albumName} cover`}
            className="w-full h-full object-cover"
            style={{ aspectRatio: "1/1" }}
          />
        </div>
        <div className="flex flex-col justify-between p-4 w-2/3">
          <div>
            <h1 className="text-base font-bold text-white truncate md:text-lg ">
              {item.songName}
            </h1>
            <Link
              href={
                item.albumDetails?._id
                  ? `/Library/AllAlbums/AlbumDetails/${item.albumDetails._id}`
                  : "#"
              }
              className="text-base text-gray-300 md:text-md truncate hover:underline"
            >
              {item.albumDetails?.albumName || item.albumName}
            </Link>
            <p className="text-xs text-gray-400 md:text-sm truncate">
              {item.genre}
            </p>
          </div>
          <div className="mt-2">
            <Link
              href={`/artist/${item.singer._id}`}
              className="textbase font-normal text-gray-200 md:text-base truncate hover:underline"
            >
              {item.singer.name}
            </Link>
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
