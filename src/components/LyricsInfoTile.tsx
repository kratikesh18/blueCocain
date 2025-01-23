import Link from "next/link";
import React from "react";

interface lyricsDetailsType {
  _id: string;
  songName: string;
  singer: {
    _id: string;
    name: string;
  };
  albumDetails: { _id: string; albumArt: string; albumName: string };
  albumName?: string;
  genre?: string;
  releaseDate?: Date;
  albumArt?: string;
}

const LyricsInfoTile = ({
  lyricsDetails,
}: {
  lyricsDetails: lyricsDetailsType;
}) => {
  return (
    lyricsDetails && (
      <div
        className={`relative h-[9rem] w-[90vw] flex items-center justify-center  shadow-2xl rounded-lg overflow-hidden md:h-fit md:flex-col md:gap-4 md:mx-auto md:w-1/2 md:aspect-square transition-transform transform xl:hover:scale-105 hover:shadow-2xl border border-gray-200/20`}
      >
        <div className="w-[12rem] h-full aspect-square md:w-full md:h-fit md:mx-auto">
          <img
            src={lyricsDetails.albumArt || lyricsDetails.albumDetails.albumArt}
            alt={`${lyricsDetails.albumName} cover`}
            className="h-full w-full object-cover rounded-lg md:shadow-md"
          />
        </div>

        <div className="w-full h-full flex flex-col py-1 justify-around md:justify-end text-white  inset-0 bg-transparent md:absolute px-4 md:pb-2 ">
          <div>
            <div className="flex justify-between items-center w-full">
              <h1 className="text-xl font-bold truncate ">
                {lyricsDetails.songName}
              </h1>
            </div>

            <Link
              href={"#"}
              // href={`/Library/AllAlbums/AlbumDetails/${lyricsDetails.albumDetails._id }`}
            >
              <h2 className="text-lg">
                {lyricsDetails.albumName ||
                  lyricsDetails.albumDetails.albumName}
              </h2>
            </Link>
            <p className="text-sm">{lyricsDetails.genre}</p>
          </div>

          <div className="flex justify-between mt-4">
            <h3 className="text-lg ">
              {}
              <Link href={`/artist/${lyricsDetails.singer._id}`}>
                {lyricsDetails.singer.name}
              </Link>
            </h3>
            <p className="text-sm self-end">
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
