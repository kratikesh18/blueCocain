import Link from "next/link";
import React from "react";
import { SongData } from "@/app/(Artists Pags)/artist/[artistId]/page";
import { SearchResultType } from "../SearchTile";
const SongDetails = ({ song }: { song: SongData | SearchResultType }) => {
  const albumName = song.albumDetails?.albumName || song.albumName;
  return (
    <Link
      href={`/lyrics/${song._id}`}
      className="flex flex-col p-2 gap-1 border-[1px] h-fit w-40 border-white/30 rounded-lg shadow-lg "
    >
      <img
        src={song.albumDetails?.albumArt}
        alt={albumName}
        className="object-cover rounded aspect-square"
      />
      <h3 className="text-xl font-bold truncate">{song.songName}</h3>
      <div className="flex text-muted-foreground text-sm justify-between items-center">
        <p className="text-gray-400">
          {new Date(song.releaseDate!).getFullYear()}
        </p>
        <p className="truncate">{albumName}</p>
      </div>
    </Link>
  );
};

export default SongDetails;
