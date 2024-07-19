"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import GatherSongDetails from "@/components/NewLyrics";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface AlbumDetails {
  _id: string;
  albumName: string;
  by: { name: string };
  releaseDate: string;
  genre: string;
}

function AddNewLyricsPage() {
  const { albumId } = useParams();

  const [albumDetails, setAlbumDetails] = useState<AlbumDetails | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAlbumDetailsById = async (albumId: string) => {
      setLoading(true);
      try {
        const response = await axios.get(
          `/api/validateAlbum?albumId=${albumId}`
        );
        setAlbumDetails(response.data.result[0]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (albumId) {
      getAlbumDetailsById(albumId.toString());
    }
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <div>
      {albumDetails && <GatherSongDetails albumdetailsProps={albumDetails} />}
    </div>
  );
}

export default AddNewLyricsPage;
