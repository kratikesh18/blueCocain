import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";

const LyricsInfoTile = ({ lyricsDetails }: { lyricsDetails: any }) => {
  return (
    lyricsDetails && (
      <div className="flex items-center justify-center  border-2 border-black/20 shadow-xl w-full h-fit rounded-lg  py-2 px-2 md:w-fit md:flex-col md:gap-4 md:mx-auto">
        <div className="w-[28%] mr-4 md:w-[15rem] md:mx-auto">
          <Image
            src={lyricsDetails.albumArt}
            alt={`${lyricsDetails.albumName} cover`}
            className="h-full  w-full object-fill rounded-lg md:shadow-md "
          />
        </div>
        <div className="flex justify-between w-full gap-4 ">
          <div>
            <h1 className="text-xl font-bold">{lyricsDetails.songName}</h1>
            <h2 className="text-lg text-gray-600">{lyricsDetails.albumName}</h2>
            <p className="text-base text-gray-500">{lyricsDetails.genre}</p>
          </div>

          <div className="flex flex-col justify-between ">
            <h3 className="text-lg font-medium%">
              {lyricsDetails.singer.name}
            </h3>
            <p className="text-base text-gray-500 self-end">
              {lyricsDetails.releaseDate &&
                new Date(lyricsDetails.releaseDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    )
  );
};

export default LyricsInfoTile;
