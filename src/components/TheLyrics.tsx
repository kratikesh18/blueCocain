"use client";
import { useLyrics } from "@/context/LyricsContext";
import React, { useEffect, useState } from "react";
import SearchTile from "./SearchTile";
import LyricsInfoTile from "./LyricsInfoTile";

interface TheLyricsProps {
  songId?: string | null;
}

const TheLyrics: React.FC<TheLyricsProps> = ({ songId }) => {
  const { loading, error, lyricsDetails, fetchLyricsDetails } = useLyrics();
  const [currentTime, setCurrentTime] = useState<number>(0);

  useEffect(() => {
    if (songId) {
      fetchLyricsDetails(songId);
    }
  }, [songId]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!lyricsDetails) {
    return <div>No lyrics found</div>;
  }

  const getCurrentLine = () => {
    return lyricsDetails.lyricsText.find(
      (line) => line.startTime <= currentTime && line.endTime >= currentTime
    );
  };

  const currentLine = getCurrentLine();

  return (
    <div className="flex flex-col justify-center items-center p-4">
      <LyricsInfoTile lyricsDetails={lyricsDetails} />

      <div className="flex flex-col gap-4 text-left h-full text-2xl font-semibold w-full mt-4 p-4 bg-white shadow-lg rounded-lg">
        {lyricsDetails.lyricsText.map((text, index) => (
          <div
            key={index}
            className={`p-2 rounded ${
              currentLine === text ? "bg-blue-100" : ""
            }`}
          >
            <h1 className={`${currentLine === text ? "text-blue-600" : ""}`}>
              {text.line}
            </h1>
            <div className="flex justify-between text-xs text-gray-400">
              <p>
                {new Date(text.startTime * 1000).toISOString().substr(14, 5)}
              </p>
              <p>{new Date(text.endTime * 1000).toISOString().substr(14, 5)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TheLyrics;
