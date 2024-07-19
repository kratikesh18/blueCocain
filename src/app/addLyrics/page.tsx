"use client";
import RightIcon from "@/components/icons/RightIcon";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface FetchedAlbum {
  _id?: string;
  albumName?: string;
  albumArt?: string;
  by?: {
    name?: string;
  };
  releaseDate?: Date;
}

const AddNewLyricsPage = () => {
  const [albumNameQuery, setAlbumNameQuery] = useState("");
  const debouncedAlbumQuery = useDebounce(albumNameQuery, 400);
  const [fetchedAlbums, setFetchedAlbums] = useState<FetchedAlbum[] | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function validateAlbumQuery(queryInput: string) {
      if (!queryInput) return;
      setFetchedAlbums(null);
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `/api/validateAlbum?albumname=${queryInput}`
        );
        setFetchedAlbums(response.data.result);
      } catch (error) {
        setError("No Albums found.");
      } finally {
        setLoading(false);
      }
    }
    validateAlbumQuery(debouncedAlbumQuery);
  }, [debouncedAlbumQuery]);

  return (
    <div className="bg-black min-h-screen p-6">
      <h1 className="text-4xl font-bold theme-text-style mb-6 text-center">
        Find An Album To Add Song
      </h1>
      <div className="flex justify-center mb-6">
        <Input
          type="text"
          value={albumNameQuery}
          onChange={(e) => setAlbumNameQuery(e.target.value)}
          className="p-8 text-white font-medium w-full max-w-lg text-xl  rounded-md"
          placeholder="Search for album"
        />
      </div>
      {loading && <div className="loader"></div>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="space-y-4">
        {fetchedAlbums &&
          fetchedAlbums.length > 0 &&
          fetchedAlbums.map((eachAlbum) => (
            <Link
              href={`/addLyrics/createLyrics/${eachAlbum._id}`}
              key={eachAlbum._id}
              className="text-white text-lg border-2 border-white/10 rounded-lg p-4 flex items-center justify-between"
            >
              <div>
                <h1 className="font-bold">{eachAlbum.albumName}</h1>
                <h2 className="text-gray-400">{eachAlbum?.by?.name}</h2>
              </div>
              <div>
                <img
                  src={eachAlbum.albumArt}
                  alt={`${eachAlbum.albumName} cover`}
                  className="h-24 w-24 object-cover rounded-md shadow-lg"
                />
              </div>
            </Link>
          ))}
        {fetchedAlbums && fetchedAlbums.length === 0 && (
          <div className="flex flex-col gap-2  ">
            <h1 className=" text-xl text-muted-foreground">No Albums found </h1>
            <h2 className="text-white flex gap-2 text-2xl items-center">
              Create{" "}
              <Link
                href={`/addLyrics/createAlbum/${albumNameQuery}`}
                className="font-bold underline "
              >
                {albumNameQuery}
              </Link>{" "}
              <RightIcon />{" "}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddNewLyricsPage;
