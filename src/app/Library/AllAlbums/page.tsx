"use client";
import { Album } from "@/models/AlbumModel";
import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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

  async function deleteAlbum(id: any) {
    try {
      const response = await axios.delete(`/api/deleteAlbum`, {
        data: { albumId: id },
      });
      console.log(response.data.message);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container lg:p-10">
      <h1 className="text-3xl font-bold text-center mb-8 theme-text-style">
        All Albums
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6">
        {albumDetails &&
          albumDetails.map((eachAlbum, index) => (
            <Link
              href={`/Library/AllAlbums/AlbumDetails/${eachAlbum._id}`}
              key={index}
              className="bg-transparent w backdrop-blur-xl border-[1px] border-white/20 flex gap-4 p-3 rounded-lg shadow-md transition transform hover:scale-105"
            >
              <div className="w-2/5">
                <img
                  src={eachAlbum.albumArt}
                  className="w-[10rem] h-[10rem] overflow-hidden object-cover rounded-md aspect-square"
                />
              </div>
              <div>
                <Button onClick={() => deleteAlbum(eachAlbum._id)}>
                  Delete
                </Button>

                <h2 className="text-lg font-semibold text-white mb-2  ">
                  {eachAlbum.albumName}
                </h2>
                <p className="text-sm text-gray-400">
                  Genre: {eachAlbum.genre}
                </p>
                <p className="text-sm text-gray-400">
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
