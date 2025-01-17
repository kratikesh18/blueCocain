"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface DetailsPageDataType {
  albumName: string;
  albumArt: string;
  tracks: [
    { _id: string; songName: string; singer: { _id: string; name: string } }
  ];
  by: [{ _id: string; name: string }]; // Reference to the Artist model
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

  if (!detailsPageData) {
    return (
      <div>
        <p>Album not found</p>
      </div>
    );
  }

  return (
    <div className="container flex gap-4 ">
      <div className="flex h-[10rem] gap-4 p-4 items-center border-[1px] border-gray-300/60 rounded-md   backdrop-blur-xl bg-gray-400/10">
        <img
          src={detailsPageData.albumArt}
          alt={detailsPageData.albumName}
          className="h-full  aspect-square object-cover rounded-lg"
        />
        <div>
          <h1 className="text-3xl">{detailsPageData.albumName}</h1>
          <p>
            <span className="text-gray-50">By: </span>
            {detailsPageData.by.map((eachArtist) => (
              <span className="">
                {eachArtist.name}
                {", "}
              </span>
            ))}
          </p>{" "}
          {/* Adjust this line if 'by' contains an object with artist details */}
          <p>
            <span className="text-gray-400">Release Date:</span>{" "}
            {new Date(detailsPageData.releaseDate).toDateString()}
          </p>
          <p>
            <span className="text-gray-400">Genre:</span>{" "}
            {detailsPageData.genre}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 w-full">
        <h2 className="text-2xl">Tracks</h2>
        <ul>
          {detailsPageData.tracks.map((track) => (
            <li key={track._id}>
              <Link href={`/lyrics/${track._id}`}>
                <div className="flex w-full justify-between px-10 backdrop-blur-md border-[1px] p-1 bg-gray-400/20 border-gray-300/60 rounded-md ">
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
  );
};

export default AlbumDetailsPage;
