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

// import { Libre_Caslon_Text, Oxygen_Mono } from "next/font/google";

interface TheLyricsProps {
  songId: string;
  isEditing?: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}
// const lyricsFont = Oxygen_Mono({ subsets: ["latin"], weight: "400" });
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
    fetchLyricsDetails(songId);
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
      <div className="flex flex-col justify-center h-[92.2vh] items-center p-4 gap-4 text-white text-center">
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

  // console.log("Printing the currentline " , currentLine);
  const bgColors = [
    "bg-emerald-950/80",
    "bg-orange-950/80",
    "bg-red-950/80",
    "bg-purple-950/80",
    "bg-violet-950/80",
    "bg-indigo-950/80",
    "bg-rose-950/80",
    "bg-yellow-950/80",
    "bg-pink-950/80",
    "bg-green-950/80",
    "bg-blue-950/80",
    "bg-teal-950/80",
    "bg-cyan-950/80",
    "bg-amber-950/80",
    "bg-lime-950/80",
    "bg-fuchsia-950/80",
  ];

  return (
    <div className=" container flex flex-col justify-between h-[92.2vh] items-center p-4 md:flex-row-reverse">
      <div className={`md:w-1/4`}>
        <LyricsInfoTile lyricsDetails={lyricsDetails} />
      </div>

      <div
        className={`flex flex-col gap-4 text-left h-full text-2xl font-semibold w-full md:w-3/4 my-4 p-4  rounded-lg  overflow-y-scroll scrollbar-none`}
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
            <div key={index}>
              <LyricsLine
                key={index}
                line={line}
                isEditing={false}
                isCurrent={currentLine === line}
                index={index}
                handleLineChange={handleLineChange}
              />
            </div>
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
