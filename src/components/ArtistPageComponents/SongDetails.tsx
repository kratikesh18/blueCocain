import Link from "next/link";
import React from "react";
import { SongData } from "@/app/(Artists Pags)/artist/[artistId]/page";




const SongDetails = ({ song }: { song: SongData }) => {
  const albumName = song.albumDetails?.albumName || song.albumName;

  return (
    <Link
      href={`/lyrics/${song._id}`}
      className="flex flex-col p-2 gap-1 border-[1px] h-fit w-40 border-white/30 rounded-lg shadow-lg m-2"
    >
      <img
        src={song.albumDetails?.albumArt}
        alt={albumName}
        className="object-cover rounded aspect-square"
      />
      <h3 className="text-xl font-bold truncate">{song.songName}</h3>
      <div className="flex text-muted-foreground text-sm justify-between items-center">
        <p className="text-gray-400">
          {new Date(song.releaseDate).getFullYear()}
        </p>
        <p>{song.genre}</p>
      </div>
    </Link>
  );
};

export default SongDetails;
