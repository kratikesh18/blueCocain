"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import SpotifyPlayerState from "@/components/ProfilePageComponents/SpotifyPlayerState";
import { SearchResultType } from "@/components/SearchTile";
import { ScrollAreas } from "@/components/specials/ScrollAreas";
import { Artist } from "@/models/ArtistModel";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const { data: session, status } = useSession();
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

  // const getProfileData = async () => {
  //   try {
  //     const response = await axios.post(`/api/allotToAritst`);
  //     console.log(response);
  //     toast({
  //       title: "Thank You",
  //       description: "Successfully seeded the data to model ",
  //     });
  //   } catch (error) {
  //     console.error("Failed to fetch singers:", error);
  //   }
  // };

  useEffect(() => {
    getAllLyrics();
    getAllSingers();
  }, []);

  if (loading.lyrics || loading.singers || status === "loading") {
    return <LoadingSpinner />;
  }

  if (status === "unauthenticated" || !session) {
    // router.push("/login")
    console.log("Not Authenticated");
    return null; // Prevent further rendering
  }

  return (
    <div className="container flex gap-3 flex-col h-[92.2vh] overflow-y-scroll scrollbar-none ">
      {/* Header Section */}
      
      <div className="flex flex-col-reverse items-center bg-gray-200/10 bg-opacity-10 border border-white/20 md:justify-between md:flex-row p-5 rounded-lg">
        <div className="text-center md:text-left mt-4 md:mt-0  text-white">
          <h1 className=" text-5xl font-bold md:text-6xl">
            Hey,{session.user?.name}
          </h1>
          <div className="mt-2">
            <p className="">The President at blueCocain,</p>
            <p className="">contributed 69+ Lyrics.</p>
          </div>
        </div>
        <div className="">
          <img
            src={session.user?.image || "/default-profile.png"} // Fallback image if no profile image
            alt={`${session.user?.name}'s Image`}
            loading="lazy"
            className="object-cover rounded-full h-48 w-48 border-4"
          />
        </div>
      </div>

      {/* Spotify Section */}
      <div className="bg-gray-200/10 backdrop-blur-2xl bg-opacity-10 border border-white/20 px-5 rounded-lg ">
        <h1 className="text-xl text-white my-4 font-bold">
          Currently On Spotify
        </h1>
        <SpotifyPlayerState session={session} />
      </div>

      {/* Favorite Songs Section */}
      <div className="p-5 bg-gray-200/10 bg-opacity-10 border border-white/20">
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
      <div className="bg-gray-200/10 bg-opacity-10 border border-white/20 p-5">
        <h1 className="text-white text-2xl font-semibold flex items-center gap-2 mb-4">
          Your Top Artists
        </h1>
        {allSingers?.length ? (
          <ScrollAreas allSingers={allSingers} />
        ) : (
          <p className="text-gray-400">No top artists found.</p>
        )}
      </div>
      {/* <button onClick={getProfileData}>Seed Data</button> */}
    </div>
  );
};

export default ProfilePage;
