import axios from "axios";
import { Session } from "next-auth";
import React, { useEffect, useState } from "react";

interface SpotifyTrackResponse {
  album: {
    name: string; // Album name
    artists: { name: string }[]; // Array of artist names in the album
  };
  artists: { name: string }[]; // Array of artist names for the track
  name: string; // Track name
}

const SpotifyPlayerState = ({session}:{session : Session}) => {
  const [currentPlayerData, setCurrentPlayerData] = useState<SpotifyTrackResponse | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch Current Spotify Player State
  const getCurrentPlayerState = async () => {
    setLoading(true);
    if (!session) return;
    try {
      const response = await axios.get(`https://api.spotify.com/v1/me/player/currently-playing`, {
        headers: { Authorization: `Bearer ${session.accessToken}` },
        });
        // const {name , artist, album} = await response.data;
      console.log("Spotify State:", response.data.item);

      if(response){
         await setCurrentPlayerData(response.data.item)
      }
    } catch (error) {
      console.error("Failed to fetch Spotify state:", error);

    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentPlayerState();
  }, []);

  
if(loading){
  return <div className="text-white
  ">Loading...</div>
}

return (
    <div className="w-full flex justify-center items-center" onClick={getCurrentPlayerState}>
      {currentPlayerData? <div className="text-white border border-white w-2/3 p-3 rounded-md md:w-1/6">
        <p className="text-xl font-bold truncate">{currentPlayerData.name}</p>
        <div className="flex justify-between">
          {currentPlayerData.artists.map((artist) => (
            <p key={artist.name}>{artist.name}</p>
          ))}
          <p>{currentPlayerData.album.name}</p>
        </div>
      </div>:<div className="text-white border border-white w-1/2 p-3 text-center rounded-md md:w-1/6"> <h1>No Song is Playing on Spotify</h1></div>
      }
     
    </div>
  );
};

export default SpotifyPlayerState;
