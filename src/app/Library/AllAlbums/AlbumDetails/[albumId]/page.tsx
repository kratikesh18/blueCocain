"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Album } from "@/models/AlbumModel";
import axios from "axios";
import mongoose from "mongoose";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface DetailsPageDataType {
  albumName: string;
  albumArt: string;
  tracks: [
    { _id: string; songName: string; singer: { _id: string; name: string } }
  ]; // References to Lyrics model
  by: { _id: mongoose.Schema.Types.ObjectId; name: string }; // Reference to the Artist model
  releaseDate: Date;
  genre: string;
  keywords?: string[];
}
const AlbumDetailsPage = () => {
  const { albumId } = useParams();
  const [detailsPageData, setDetailsPageData] =
    useState<DetailsPageDataType | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getAlbumDetailsById(albumID: string) {
      setLoading(true);
      try {
        const response = await axios.get(
          `/api/getAlbumDetails?albumId=${albumID}`
        );
        setDetailsPageData(response.data.result);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getAlbumDetailsById(albumId.toString());
  }, [albumId]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-stone-900 via-stone-950 to-black text-white">
      {detailsPageData ? (
        <div className="flex gap-4 flex-col  ">
          <div className="flex h-[10rem] gap-4 p-4 items-center border-[1px] border-gray-300/60  rounded-md w-full backdrop-blur-xl">
            <img
              src={detailsPageData.albumArt}
              alt={detailsPageData.albumName}
              className="h-full  aspect-square object-cover rounded-lg"
            />
            <div>
              <h1 className="text-3xl">{detailsPageData.albumName}</h1>
              <p><span className="text-gray-400">By:</span> {detailsPageData.by.name}</p>{" "}
              {/* Adjust this line if 'by' contains an object with artist details */}
              <p>
              <span className="text-gray-400">Release Date:</span>{" "}
                {new Date(detailsPageData.releaseDate).toDateString()}
              </p>
              <p><span className="text-gray-400">Genre:</span> {detailsPageData.genre}</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 ">
            <h2 className="text-2xl">Tracks</h2>
            <ul className="flex flex-col gap-3">
              {detailsPageData.tracks.map((track) => (
                <li key={track._id}>
                  <Link href={`/lyrics/${track._id}`}>
                    <div className="flex p-1 w-full justify-between px-10 backdrop-blur-md border-[1px] border-gray-300/60  ">
                      <h1 className="hover:underline ">{track.songName}</h1>
                      <Link
                        href={`/artist/${track.singer._id}`}
                        className="hover:underline"
                      >
                        <h1>{track.singer.name}</h1>
                      </Link>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p>Album not found</p>
      )}
    </div>
  );
};

export default AlbumDetailsPage;
