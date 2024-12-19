import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils"; // Utility function for combining class names
import { Lyrics } from "@/context/LyricsContext";

export interface SearchResultType {
  _id?: string;
  songName: string;
  singer: { _id?: string; name: string };
  albumDetails?: { albumArt: string; _id?: string; albumName?: string };
  albumName?: string;
  genre?: string;
  releaseDate?: Date;
  albumArt?: string;
}

const SearchTile = ({ item }: { item: Lyrics | SearchResultType }) => {
  return (

    <Link
      href={`/lyrics/${item._id}`}
      className={cn(
        "flex flex-col h-fit bg-purple-950 shadow-xl rounded-lg overflow-hidden border border-gray-700 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl",
        "hover:bg-gray-700 w-full max-w-lg mx-auto"
      )}
    >
      
      <div className="flex">
        {/* Album Art Section */}
        <div className="flex-shrink-0 w-1/3 relative">
          <img
            src={item.albumArt || item.albumDetails?.albumArt}
            alt={`${item.albumName || "Album"} cover`}
            className="w-full h-full object-cover"
            style={{ aspectRatio: "1/1" }}
            loading="lazy"
          />
        </div>

        {/* Content Section */}
        <div className="flex flex-col justify-between p-4 w-2/3">
          <div>
            {/* Song Name */}
            <h1 className="text-base font-bold text-white truncate md:text-lg">
              {item.songName}
            </h1>

            {/* Album Name with Link */}
            {item.albumDetails?._id ? (
              <Link
                href={`/Library/AllAlbums/AlbumDetails/${item.albumDetails._id}`}
                className="text-base text-gray-300 md:text-md truncate hover:underline"
              >
                {item.albumDetails?.albumName || item.albumName}
              </Link>
            ) : (
              <span className="text-base text-gray-300 md:text-md truncate">
                {item.albumName}
              </span>
            )}

            {/* Genre */}
            <p className="text-xs text-gray-400 md:text-sm truncate">
              {item.genre || "Unknown genre"}
            </p>
          </div>

          {/* Artist and Release Date */}
          <div className="mt-2">
            <Link
              href={`/artist/${item.singer._id}`}
              className="text-base font-normal text-gray-200 md:text-base truncate hover:underline"
            >
              {item.singer.name}
            </Link>
            
            <p className="text-sm text-gray-400">
              {item.releaseDate
                ? new Date(item.releaseDate).toLocaleDateString()
                : "Release date not available"}
            </p>
          </div>

        </div>
      </div>


    </Link>
  );
};

export default SearchTile;
