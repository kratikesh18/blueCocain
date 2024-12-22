"use client";
import { useLyrics } from "@/context/LyricsContext";
import React, { useEffect, useState } from "react";
import LyricsInfoTile from "./LyricsInfoTile";

import LyricsLine from "@/components/LyricsPageComponents/LyricsLIne";
import LyricsEditor from "@/components/LyricsPageComponents/LyricsEditor";

import LoadingSpinner from "./LoadingSpinner";
import { Button } from "./ui/button";
import axios from "axios";
import { Toaster } from "./ui/toaster";
import { useToast } from "./ui/use-toast";
import { LyricsLine as LyricsLineType } from "@/models/LyricsModel";
import EditIcon from "./icons/EditIcon";

interface TheLyricsProps {
  songId?: string | null;
  isEditing?: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const TheLyrics: React.FC<TheLyricsProps> = ({
  songId,
  isEditing,
  setIsEditing,
}) => {
  const { loading, error, lyricsDetails, fetchLyricsDetails } = useLyrics();
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [updatedLyrics, setUpdatedLyrics] = useState<LyricsLineType[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (songId) {
      fetchLyricsDetails(songId);
    }
  }, [songId]);

  useEffect(() => {
    if (!isEditing) {
      const interval = setInterval(
        () => setCurrentTime((prevTime) => prevTime + 1),
        1000
      );
      return () => clearInterval(interval);
    }
  }, [isEditing]);

  useEffect(() => {
    if (lyricsDetails) {
      setUpdatedLyrics(lyricsDetails.lyricsText);
    }
  }, [lyricsDetails]);

  const getCurrentLine = () =>
    lyricsDetails?.lyricsText.find(
      (line) => line.startTime <= currentTime && line.endTime >= currentTime
    );

  const handleLineChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    setUpdatedLyrics((prev) =>
      prev.map((line, i) => (i === index ? { ...line, [field]: value } : line))
    );
  };

  const submitForReview = async () => {
    try {
      const response = await axios.post(`/api/contribute?for=${songId}`, {
        updatedLyrics,
      });
      if (response.status === 200) {
        setIsEditing(false);
        toast({
          title: "Thank You",
          description: "Successfully submitted for review",
        });
      }
    } catch (error: any) {
      console.error("Error submitting for review:", error.message);
    }
  };

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="flex flex-col justify-center h-screen items-center p-4 gap-4 bg-black text-white text-center">
        <h1 className="font-bold text-2xl ">
          Hold Still.. just refresh or try again after some time
        </h1>
        <p>
          blueCocain is working fine in all aspects, this is the issue occurs
          when the db is in idle mode because of lesser traffic db automatically
          shuts itself down to save resources
        </p>
      </div>
    );
  }

  if (!lyricsDetails) return <LoadingSpinner />;

  const currentLine = getCurrentLine();
  const bgColors = [
    "bg-rose-900",
    "bg-emerald-900",
    "bg-orange-900",
    "bg-red-900",
    "bg-purple-900",
    "bg-violet-900",
    "bg-indigo-900",
    "bg-yellow-900",
    "bg-pink-900",
    "bg-green-900",
    "bg-blue-950",
    "bg-teal-900",
    "bg-cyan-900",
    "bg-amber-900",
    "bg-lime-900",
    "bg-fuchsia-900",
  ];

  let colorToBg = null;

  if (songId) {
    const songIdBase10 = Math.ceil(parseInt(songId, 16));
    const colorIndex = songIdBase10 % bgColors.length;
    colorToBg = bgColors[colorIndex];
  }

  return (
    <div className="flex flex-col justify-center h-screen items-center p-4 md:flex-row bg-black">
      <div className="md:w-1/2">
        <LyricsInfoTile lyricsDetails={lyricsDetails} />
      </div>

      <div
        className={`flex flex-col gap-4 text-left h-full text-2xl font-semibold w-full my-4 p-4 ${colorToBg} shadow-lg rounded-lg md:w-1/2 overflow-y-scroll scrollbar-thin scrollbar-thumb-black/20 scrollbar-track-black/20`}
      >
        {isEditing && (
          <LyricsEditor
            updatedLyrics={updatedLyrics}
            setUpdatedLyrics={setUpdatedLyrics}
            handleLineChange={handleLineChange}
          />
        )}
        {!isEditing &&
          updatedLyrics.length > 0 &&
          updatedLyrics.map((line, index) => (
            <LyricsLine
              key={index}
              line={line}
              isEditing={false}
              isCurrent={currentLine === line}
              index={index}
              handleLineChange={handleLineChange}
            />
          ))}

        {!isEditing && updatedLyrics.length == 0 && (
          <div className="h-full w-full flex justify-center flex-col items-center text-white">
            <h1>No Lyrics Found Start Contributing</h1>
            <Button
              onClick={() => {
                setIsEditing(true);
              }}
              className="rounded-full mt-8 h-16 w-16 "
            >
              <EditIcon />
            </Button>
          </div>
        )}
        {isEditing && (
          <div className="mt-4 self-center ">
            <Button
              onClick={submitForReview}
              className="bg-green-700 font-semibold text-lg "
            >
              Mark for review
            </Button>
            <Toaster />
          </div>
        )}
      </div>
    </div>
  );
};

export default TheLyrics;
