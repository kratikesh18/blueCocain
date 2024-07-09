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
import { ScrollArea } from "./ui/scroll-area";

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

  if (error) return <div>{error}</div>;

  if (!lyricsDetails) return <LoadingSpinner />;

  const currentLine = getCurrentLine();

  return (
    <div className="flex flex-col justify-center h-screen items-center p-4 md:flex-row bg-black">
      <div className="md:w-1/2">
        <LyricsInfoTile lyricsDetails={lyricsDetails} />
      </div>

      <div className="flex flex-col gap-4 text-left h-full text-2xl font-semibold w-full mt-4 p-4 bg-violet-900 shadow-lg rounded-lg overflow-y-auto md:w-1/2 md:overflow-y-scroll scrollbar-thin scrollbar-thumb-violet-600 scrollbar-track-violet-900">
        {isEditing ? (
          <LyricsEditor
            updatedLyrics={updatedLyrics}
            setUpdatedLyrics={setUpdatedLyrics}
            handleLineChange={handleLineChange}
          />
        ) : (
          updatedLyrics.map((line, index) => (
            <LyricsLine
              key={index}
              line={line}
              isEditing={false}
              isCurrent={currentLine === line}
              index={index}
              handleLineChange={handleLineChange}
            />
          ))
        )}
        {isEditing && (
          <div className="mt-4 self-center ">
            <Button onClick={submitForReview} className="bg-green-700 font-semibold text-lg ">
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
