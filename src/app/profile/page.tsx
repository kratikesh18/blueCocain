"use client";
import LIkeIcon from "@/components/icons/LIkeIcon";
import LoadingSpinner from "@/components/LoadingSpinner";
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
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getAllLyrics() {
      setLoading(true);
      try {
        const response = await axios.get(`/api/allLyrics`);
        if (!response) {
          throw new Error("failed to fetch All Lyrics");
        }
        setAllItems(response.data.result);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    async function getAllSingers() {
      setLoading(true);
      try {
        const response = await axios.get(`/api/getAllArtistsDetails`);
        console.log(response.data);
        setAllSingers(response.data.result);
      } catch (error: any) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getAllLyrics();
    getAllSingers();
  }, []);

  if (loading || status === "loading") {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen px-8 py-6 bg-gray-950 flex flex-col md:px-12 md:py-8">
      <div className="flex justify-around md:justify-between items-center">
        <div>
          <h1 className="bg-gradient-to-b from-gray-200 via-white to-gray-600 text-transparent bg-clip-text text-5xl font-bold md:text-6xl">
            Hey, {session?.user.username}
          </h1>
          <p className="bg-gradient-to-b from-gray-200 via-white to-gray-600 text-transparent bg-clip-text">
            The President at blueCocain,
          </p>
          <p className="bg-gradient-to-b from-gray-200 via-white to-gray-600 text-transparent bg-clip-text">
            contributed 69+ Lyrics.
          </p>
        </div>
        <img
          src="https://media.licdn.com/dms/image/D4D03AQH11qYMu73TJg/profile-displayphoto-shrink_200_200/0/1711821636406?e=2147483647&v=beta&t=8tntS0jZstDzVW-QR66LwELyu49LrwAxzq-7G4PY0RY"
          alt={session?.user.username}
          className="rounded-full w-1/4 md:w-[10rem] md:relative md:right-32"
        />
      </div>

      <div className="mt-16 w-full md:mt-20">
        <h1 className="text-white text-2xl font-semibold flex items-center gap-2 mb-4">
          Your Favorite Songs <LIkeIcon />
        </h1>
        <ScrollAreas allItems={allItems} />
      </div>
      <div className="mt-4 w-full ">
        <h1 className="text-white text-2xl font-semibold flex items-center gap-2 mb-4">
          Your Top Artists
        </h1>
        <ScrollAreas allSingers={allSingers} />
      </div>
      <div className="mt-4 w-full ">
        <h1 className="text-white text-2xl font-semibold flex items-center gap-2 mb-4">
          Your Top Contributions
        </h1>
        <ScrollAreas allLiked={allItems} />
      </div>
    </div>
  );
};

export default ProfilePage;
