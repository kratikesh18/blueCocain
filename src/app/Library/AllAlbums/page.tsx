"use client";
import { Album } from "@/models/AlbumModel";
import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import Link from "next/link";


const AlbumsPage = () => {
  const [loading, setLoading] = useState(false);
  const [albumDetails, setAlbumDetails] = useState<Album[] | null>(null);

  useEffect(() => {
    async function getAllAlbums() {
      setLoading(true);
      try {
        const response = await axios.get(`/api/getAllAlbums`);
        console.log(response.data.result);
        setAlbumDetails(response.data.result);
      } catch (error: any) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    }
    getAllAlbums();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 bg-gradient-to-b from-gray-800 via-slate-900 to-black min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 theme-text-style">
        All Albums
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {albumDetails &&
          albumDetails.map((eachAlbum, index) => (
            <Link
              href={`/Library/AllAlbums/AlbumDetails/${eachAlbum._id}`}
              key={index}
              className="bg-transparent backdrop-blur-xl border-[1px] border-white/20 flex gap-4 p-4 rounded-lg shadow-md transition transform hover:scale-105"
            >
              <div>
                <img
                  src={eachAlbum.albumArt}
                  className="w-[10rem] h-[10rem] overflow-hidden object-cover"
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">
                  {eachAlbum.albumName}
                </h2>
                <p className="text-gray-400">Genre: {eachAlbum.genre}</p>
                <p className="text-gray-400">
                  Release Date:{" "}
                  {new Date(eachAlbum.releaseDate).toLocaleDateString()}
                </p>
              </div>
              {/* Add more fields as necessary */}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default AlbumsPage;
