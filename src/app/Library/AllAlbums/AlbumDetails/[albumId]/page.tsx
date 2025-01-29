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
      <div className="flex items-center justify-center min-h-screen text-center">
        <p className="text-xl font-semibold text-gray-600">Album not found</p>
      </div>
    );
  }

  return (
    <div className="container py-8 flex w-full gap-4">
      {/* Album Details Section */}
      <div className="flex flex-col items-center gap-8 w-2/5 bg-gray-500/20 text-white p-6 rounded-lg shadow-lg">
        <div className="w-48 h-48 flex-shrink-0">
          <img
            src={detailsPageData.albumArt}
            alt={`${detailsPageData.albumName} Cover`}
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{detailsPageData.albumName}</h1>
          <p>
            <span className="text-gray-400">By: </span>
            {detailsPageData.by.map((artist, index) => (
              <Link
                href={`/artist/${artist._id}`}
                key={artist._id}
                className="hover:underline text-accent-foreground"
              >
                {artist.name}
                {index < detailsPageData.by.length - 1 && ", "}
              </Link>
            ))}
          </p>
          <p>
            <span className="text-gray-400">Release Date: </span>
            {new Date(detailsPageData.releaseDate).toLocaleDateString()}
          </p>
          <p>
            <span className="text-gray-400">Genre: </span>
            {detailsPageData.genre}
          </p>
        </div>
      </div>

      {/* Tracks Section */}
      <div className="mt-8 w-3/5">
        <h2 className="text-2xl font-semibold mb-4  ">Tracks</h2>
        <ul className="space-y-4">
          {detailsPageData.tracks.map((track) => (
            <li
              key={track._id}
              className="text-white bg-gray-500/20 transition duration-200 p-4 rounded-lg shadow-md"
            >
              <object>
                <Link href={`/lyrics/${track._id}`} className="block">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-medium]">{track.songName}</h3>
                      <object>
                        <Link
                          href={`/artist/${track.singer._id}`}
                          className="text-sm text-green-600 hover:underline"
                        >
                          {track.singer.name}
                        </Link>
                      </object>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5 text-gray-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>
              </object>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AlbumDetailsPage;
