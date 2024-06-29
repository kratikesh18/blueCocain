import React from "react";

const LyricsInfoTile = ({ lyricsDetails }: { lyricsDetails: any }) => {
  return (
    <div className="flex pt-2 border-4 shadow-2xl w-full h-[20vh] bg-white rounded-lg p-4">
      <div className="w-[15%] mr-4">
        <img
          src={lyricsDetails.albumArt}
          alt={`${lyricsDetails.albumName} cover`}
          className="h-full object-contain rounded-lg"
        />
      </div>
      <div className="flex flex-col justify-between w-full">
        <div>
          <h1 className="text-2xl font-bold">{lyricsDetails.songName}</h1>
          <h2 className="text-xl text-gray-600">{lyricsDetails.albumName}</h2>
          <p className="text-lg text-gray-500">{lyricsDetails.genre}</p>
        </div>
        <div className="flex justify-between">
          <h3 className="text-xl">{lyricsDetails.singer.name}</h3>
          <p className="text-lg text-gray-500">
            {lyricsDetails.releaseDate &&
              new Date(lyricsDetails.releaseDate).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LyricsInfoTile;
