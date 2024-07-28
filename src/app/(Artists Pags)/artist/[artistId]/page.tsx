"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import ArtistProfile from "@/components/PageComponents/ArtistProfile";
import { Artist } from "@/models/ArtistModel";
import { GearIcon } from "@radix-ui/react-icons";
import axios from "axios";
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

export interface ArtistPageType {
  _id: string;
  name: string;
  bio: string;
  genre: string[];
  debutDate: string;
  songs: string[];
  albums: AlbumArtistPageType[];
  artistProfileImage: string;
  keywords: string[];
}

const ArtistDetailsPage = () => {
  const { artistId } = useParams();
  const [fetchedArtistProfile, setFetchedArtistProfile] =
    useState<ArtistPageType | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getArtistDetailsFull = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `/api/getArtistDetailsById?artistId=${artistId} `
        );
        setFetchedArtistProfile(response.data.result);
      } catch (error) {
        console.log("error while fetching the data", error);
      } finally {
        setLoading(false);
      }
    };
    getArtistDetailsFull();
  }, []);

  if (!fetchedArtistProfile || loading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="bg-gradient-to-b from-gray-900 to-black  text-white">
      {fetchedArtistProfile && <ArtistProfile artist={fetchedArtistProfile} />}
    </div>
  );
};

export default ArtistDetailsPage;