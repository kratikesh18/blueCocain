"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import SpotifyPlayerState from "@/components/ProfilePageComponents/SpotifyPlayerState";
import { SearchResultType } from "@/components/SearchTile";
import ProfileImage from "@/components/specials/ProfileImage";
import { ScrollAreas } from "@/components/specials/ScrollAreas";
import { Artist } from "@/models/ArtistModel";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [allItems, setAllItems] = useState<SearchResultType[] | null>(null);
  const [allSingers, setAllSingers] = useState<Artist[] | null>(null);
  const [loading, setLoading] = useState({ lyrics: false, singers: false });

  // Fetch Lyrics Data
  const getAllLyrics = async () => {
    setLoading((prev) => ({ ...prev, lyrics: true }));
    try {
      const response = await axios.get(`/api/allLyrics`);
      setAllItems(response.data.result);
    } catch (error) {
      console.error("Failed to fetch lyrics:", error);
    } finally {
      setLoading((prev) => ({ ...prev, lyrics: false }));
    }
  };

  // Fetch Singers Data
  const getAllSingers = async () => {
    setLoading((prev) => ({ ...prev, singers: true }));
    try {
      const response = await axios.get(`/api/getAllArtistsDetails`);
      setAllSingers(response.data.result);
    } catch (error) {
      console.error("Failed to fetch singers:", error);
    } finally {
      setLoading((prev) => ({ ...prev, singers: false }));
    }
  };

  const getProfileData = async () => {
    try {
      const response = await axios(`/api/getProfileData?id=`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {}
  };

  useEffect(() => {
    getAllLyrics();
    getAllSingers();
  }, []);

  if (loading.lyrics || loading.singers || status === "loading") {
    return <LoadingSpinner />;
  }

  if (status === "unauthenticated" || !session) {
    // router.push("/login")
    console.log("Not Authenticated")
    return null; // Prevent further rendering
  }

  return (
    <div className="min-h-screen px-8 py-6 bg-gradient-to-br from-gray-900 via-purple-950 to-black  flex flex-col md:px-12 md:py-8">
      {/* Header Section */}
      <div className="flex flex-col-reverse items-center md:justify-between md:flex-row">
        <div className="text-center md:text-left mt-4 md:mt-0 md:w-[50%]">
          <h1 className="bg-gradient-to-b from-gray-200 via-white to-gray-600 text-transparent bg-clip-text text-5xl font-bold md:text-6xl">
            Hey, {session.user?.name}
          </h1>
          <div className="mt-2">
            <p className="bg-gradient-to-b from-gray-200 via-white to-gray-600 text-transparent bg-clip-text">
              The President at blueCocain,
            </p>
            <p className="bg-gradient-to-b from-gray-200 via-white to-gray-600 text-transparent bg-clip-text">
              contributed 69+ Lyrics.
            </p>
          </div>
        </div>
        <ProfileImage session={session} />
      </div>

      {/* Spotify Section */}
      <div className="mt-8">
        <h1 className="text-xl text-white my-4 font-bold">
          Currently On Spotify
        </h1>
        <SpotifyPlayerState session={session} />
      </div>

      {/* Favorite Songs Section */}
      <div className="mt-16 w-full md:mt-20">
        <h1 className="text-white text-2xl font-semibold flex items-center gap-2 mb-4">
          Your contributed Songs
        </h1>
        {allItems?.length ? (
          <ScrollAreas allItems={allItems} />
        ) : (
          <p className="text-gray-400">No favorite songs found.</p>
        )}
      </div>

      {/* Top Artists Section */}
      <div className="mt-4 w-full">
        <h1 className="text-white text-2xl font-semibold flex items-center gap-2 mb-4">
          Your Top Artists
        </h1>
        {allSingers?.length ? (
          <ScrollAreas allSingers={allSingers} />
        ) : (
          <p className="text-gray-400">No top artists found.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
