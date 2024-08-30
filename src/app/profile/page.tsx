"use client";
import CameraIcon from "@/components/icons/CameraIcon";
import LIkeIcon from "@/components/icons/LIkeIcon";
import LoadingSpinner from "@/components/LoadingSpinner";
import { SearchResultType } from "@/components/SearchTile";
import ProfileImage from "@/components/specials/ProfileImage";
import { ScrollAreas } from "@/components/specials/ScrollAreas";
import { Button } from "@/components/ui/button";
import { Artist } from "@/models/ArtistModel";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const { data: session, status } = useSession();

  const [allItems, setAllItems] = useState<SearchResultType[] | null>(null);
  const [allSingers, setAllSingers] = useState<Artist[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
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
        // console.log(response.data);
        setAllSingers(response.data.result);
      } catch (error: any) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    async function lamo() {
      console.log(session);
    }
    lamo();
    getAllLyrics();
    getAllSingers();
  }, []);

  if (loading || status === "loading") {
    return <LoadingSpinner />;
  }

  if (status === "unauthenticated" || !session) {
    router.push("/login");
  }
  if (!session) {
    return <div>No session found</div>;
  }
  const handleSpotifyLogin = () => {
    const whateverREsponse = signIn("spotify");
    console.log(whateverREsponse);
  };

  return (
    <div className="min-h-screen px-8 py-6 bg-gray-950 flex flex-col md:px-12 md:py-8">
      <div className="flex flex-col-reverse items-center md:justify-between  md:flex-row  ">
        <div className="text-center md:text-left mt-4 md:mt-0 ">
          <h1 className="bg-gradient-to-b from-gray-200 via-white to-gray-600 text-transparent bg-clip-text text-5xl font-bold md:text-6xl">
            Hey, {session?.user.username}
          </h1>
          <div className="mt-2">
            <p className="bg-gradient-to-b from-gray-200 via-white to-gray-600 text-transparent bg-clip-text">
              The President at blueCocain,
            </p>
            <p className="bg-gradient-to-b from-gray-200 via-white to-gray-600 text-transparent bg-clip-text">
              contributed 69+ Lyrics.
            </p>
          </div>

          <div className="mt-4">
            <Button
              onClick={handleSpotifyLogin}
              className="bg-green-950 h-[3rem] w-fit"
            >
              Connect
              <div className="aspect-auto  h-full w-full ml-2">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Spotify_logo_with_text.svg/559px-Spotify_logo_with_text.svg.png?20160123211747"
                  className="h-full w-full"
                />
              </div>
            </Button>
          </div>
        </div>

        <ProfileImage session={session} />
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
