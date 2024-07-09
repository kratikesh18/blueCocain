import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";

const LyricsInfoTile = ({ lyricsDetails }: { lyricsDetails: any }) => {
  return (
    lyricsDetails && (
      <div className=" flex items-center justify-center border-[1px] border-white border-black/20 shadow-xl  rounded-lg  py-2 px-2  md:flex-col md:gap-4 md:mx-auto md:w-1/2  md:aspect-square ">
        <div className="w-[28%] mr-4 md:w-[15rem] md:mx-auto">
          <img
            src={lyricsDetails.albumArt}
            alt={`${lyricsDetails.albumName} cover`}
            className="h-full w-full  object-cover aspect-square
             rounded-lg md:shadow-md "
          />
        </div>
        <div className="flex justify-between w-full gap-4  ">
          <div>
            <h1 className="text-xl font-bold text-gray-200">
              {lyricsDetails.songName}
            </h1>
            <h2 className="text-lg text-gray-300 ">
              {lyricsDetails.albumName}
            </h2>
            <p className="text-base text-gray-400">{lyricsDetails.genre}</p>
          </div>

          <div className="flex flex-col justify-between ">
            <h3 className="text-lg font-medium text-gray-200">
              {lyricsDetails.singer.name}
            </h3>
            <p className="text-base text-gray-400 self-end">
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
