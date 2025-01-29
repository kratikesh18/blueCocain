import axios, { AxiosError } from "axios";
import { Session } from "next-auth";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Refresh from "../icons/Refresh";

interface SpotifyTrackResponse {
  album: {
    name: string; // Album name
    artists: { name: string }[]; // Array of artist names in the album
  };
  artists: { name: string }[]; // Array of artist names for the track
  name: string; // Track name
}

const SpotifyPlayerState = ({ session }: { session: Session }) => {
  const router = useRouter();

  const [currentPlayerData, setCurrentPlayerData] =
    useState<SpotifyTrackResponse | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [spotifyError, setSpotifyError] = useState<string>(
    "See whats playing on your spotify!"
  );
  // Fetch Current Spotify Player State
  const getCurrentPlayerState = async () => {
    setLoading(true);
    setError(null);
    if (!session) return;
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/me/player/currently-playing`,
        {
          headers: { Authorization: `Bearer ${session.accessToken}` },
        }
      );
      // const {name , artist, album} = await response.data;
      // console.log("Spotify State:", response.data.item);
      if (response) {
        setCurrentPlayerData(response.data.item);
      }
      if (response.status == 204) {
        setSpotifyError("Heard Silence in your spotify");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const { response } = error;
        // console.log(response?.data.error.message);
        setSpotifyError(response?.data.error.message + " Please Login again ");
      }
    } finally {
      setLoading(false);
    }
  };

  const validateLyrics = async () => {
    try {
      const response = await axios.get(
        `/api/validateLyrics?songNameToValidate=${currentPlayerData?.name}`
      );
      console.log(response.data);
      if (response) {
        router.push(`/lyrics/${response.data.data.lyricsId}`);
      }
    } catch (error) {
      setError("Lyrics Not Found");
      console.error("Error validating lyrics:", error);
    }
  };

  if (loading) {
    return <div className="text-white loader"></div>;
  }

  return (
    <>
      {currentPlayerData ? (
        <div className="text-white w-full p-3 rounded-md flex flex-col gap-1  ">
          <p className="text-xl font-bold truncate">{currentPlayerData.name}</p>
          <p>
            {currentPlayerData.artists.map((artist) => artist.name).join(", ")}
          </p>
          <p>{currentPlayerData.album.name}</p>
          <div className="flex gap-4">
            <Button
              className={`font-semibold ${!error ? "bg-green-900" : ""}`}
              variant={error ? "destructive" : "default"}
              onClick={validateLyrics}
            >
              {error ? error : "Check for Lyrics"}
            </Button>

            <Button
              className="bg-green-800 font-semibold gap-2"
              onClick={getCurrentPlayerState}
            >
              <Refresh /> Refresh
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-white border border-white w-1/2 p-3 text-center rounded-md md:w-1/6">
          <h1>{spotifyError}</h1>
          <Button
            className="bg-green-800 font-semibold"
            onClick={getCurrentPlayerState}
          >
            Refresh
          </Button>
        </div>
      )}
    </>
  );
};

export default SpotifyPlayerState;
