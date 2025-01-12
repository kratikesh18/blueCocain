"use client";
import React, { useEffect } from "react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import Link from "next/link";
import { ScrollAreas } from "../specials/ScrollAreas";
import { ArtistPageType } from "@/app/(Artists Pags)/artist/[artistId]/page";
import AlbumDetailsArtist from "../ArtistPageComponents/AlbumDetailsArtist";
import SongDetails from "../ArtistPageComponents/SongDetails";

interface ArtistProfileProps {
  artist: ArtistPageType;
}


const ArtistProfile: React.FC<ArtistProfileProps> = ({ artist }) => {
  useEffect(() => {}, []);
  return (
    <div className="min-h-screen w-full flex flex-col items-center px-4 gap-6">
      <div className="w-full flex flex-col mt-6 ">
        <div className="flex justify-between absolute w-[92%] md:w-[97%]  ">
          <div>
            <h2 className="text-base font-semibold mb-2">Genre</h2>
            <p className="text-gray-300 ">{artist.genre[0]}</p>
          </div>

          <div className="text-right">
            <h2 className="text-base font-semibold mb-2">Debut Date</h2>
            <p className="text-gray-300">
              {new Date(artist.debutDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center  ">
          <img
            src={artist.artistProfileImage}
            alt={artist.name}
            className="w-40 h-40 rounded-full object-cover mb-4 border-8 border-gray-300"
          />
          <h1 className="text-3xl font-bold mb-2">{artist.name}</h1>
          <p className="text-gray-400 text-center text-sm">{artist.bio}</p>
        </div>
      </div>

      <div className="w-full ">
        <h2 className="text-2xl font-semibold mb-2">Albums</h2>
        {artist.albums.length > 0 ? (
          <ScrollArea className="whitespace-nowrap rounded-md pl-2 ">
            <div className="flex rounded-md backdrop-blur-3xl mb-3">
              {artist.albums.map((album) => (
                <AlbumDetailsArtist key={album._id} album={album} />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        ) : (
          <p className="text-gray-400">No albums available</p>
        )}
      </div>

      <div className="w-full ">
        <h1 className="text-2xl font-semibold mb-2">Songs</h1>
        {artist.songs.length > 0 ? (
          <ScrollArea className="whitespace-nowrap rounded-md pl-2 ">
            <div className="flex rounded-md backdrop-blur-3xl mb-3">
              {artist.songs.map((song) => (
                <SongDetails key={song._id} song={song} />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        ) : (
          <p className="text-gray-400">No songs available</p>
        )}
      </div>
    </div>
  );
};

export default ArtistProfile;
