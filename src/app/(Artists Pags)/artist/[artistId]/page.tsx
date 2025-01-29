"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import ArtistProfile from "@/components/PageComponents/ArtistProfile";
import axios, { AxiosError } from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export interface AlbumArtistPageType {
  _id: string;
  albumName: string;
  albumArt: string;
  by: string;
  releaseDate: string;
  tracks: string[];
  genre: string;
}
export interface SongData {
  _id: string;
  songName: string;
  albumDetails: {
    albumName: string;
    albumArt: string;
  };
  albumName: string;
  genre: string;
  releaseDate: Date;
}
export interface ArtistPageType {
  _id: string;
  name: string;
  bio: string;
  genre: string[];
  debutDate: string;
  songs: SongData[];
  albums: AlbumArtistPageType[];
  artistProfileImage: string;
  keywords: string[];
}

const ArtistDetailsPage = () => {
  const { artistId } = useParams();
  const [fetchedArtistProfile, setFetchedArtistProfile] =
    useState<ArtistPageType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const getArtistDetailsFull = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `/api/getArtistDetailsById?artistId=${artistId} `
        );
        setFetchedArtistProfile(response.data.result);
      } catch (error) {
        if (error instanceof AxiosError) {
          const { response } = error;
          setError(`Error ${response?.status} : ${response?.data.message}`);
        }
        console.log("error while fetching the data", error);
      } finally {
        setLoading(false);
      }
    };
    getArtistDetailsFull();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }
  if (!fetchedArtistProfile) {
    return (
      <div>
        <h1>{error ? error : "No Artist Found with this id"}</h1>
      </div>
    );
  }
  return (
    <div className="container text-white">
      {<ArtistProfile artist={fetchedArtistProfile} />}
    </div>
  );
};

export default ArtistDetailsPage;
