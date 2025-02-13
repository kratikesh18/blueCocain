"use client";
import { useLyrics } from "@/context/LyricsContext";
import React, { useEffect, useState, useRef } from "react";
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
import Link from "next/link";

interface TheLyricsProps {
  songId: string;
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
  
  const lyricsContainerRef = useRef<HTMLDivElement>(null);
  const currentLineRef = useRef<HTMLDivElement | null>(null);

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

  // Auto-scroll to the current line
  useEffect(() => {
    if (currentLineRef.current && lyricsContainerRef.current) {
      lyricsContainerRef.current.scrollTo({
        top:
          currentLineRef.current.offsetTop -
          lyricsContainerRef.current.offsetHeight / 2,
        behavior: "smooth",
      });
    }
  }, [currentTime, isEditing]);

  // Find the currently playing line based on the timestamp
  const getCurrentLine = () =>
    updatedLyrics.find(
      (line) => line.startTime <= currentTime && line.endTime >= currentTime
    );

  // Handle clicking a line to make it the current line
  const handleLineClick = (index: number) => {
    const clickedLine = updatedLyrics[index];
    setCurrentTime(clickedLine.startTime);
  };

  // Handle line changes when editing
  const handleLineChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    setUpdatedLyrics((prev) =>
      prev.map((line, i) => (i === index ? { ...line, [field]: value } : line))
    );
  };

  // Submit lyrics for review
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
  const allSingers = [
    {
      _id: "667d482589d69198eef0b28c",
      name: "Prateek Kuhad",
      artistProfileImage:
        "https://i.scdn.co/image/ab6761610000e5eb67e860359135844d8fd6da73",
    },
  ];
  return (
    <div className="container flex flex-col justify-between h-[92.2vh] items-center gap-3 pb-4 md:flex-row-reverse">
      {/* Sidebar with Lyrics Info and Artists */}
      <div className="md:w-1/5 rounded-md h-full bg-gray-400/10 flex flex-col justify-between py-4">
        <LyricsInfoTile lyricsDetails={lyricsDetails} />
        <div className="flex flex-col items-center justify-center gap-4">
          {allSingers.map((eachArtist, index) => (
            <Link href={`/artist/${eachArtist._id}`} key={index}>
              <div className="overflow-hidden rounded-md">
                <img
                  src={eachArtist.artistProfileImage}
                  alt={`Photo of ${eachArtist.name}`}
                  className="aspect-square h-32 rounded-full object-cover"
                />
              </div>
              <figcaption className="pt-2 text-gray-200 text-xs text-center">
                {eachArtist.name}
              </figcaption>
            </Link>
          ))}
        </div>
      </div>

      {/* Lyrics Section */}
      <div
        ref={lyricsContainerRef}
        className="flex flex-col gap-4 text-left h-full text-2xl font-semibold w-full md:w-4/5 my-4 p-4 rounded-lg overflow-y-scroll scrollbar-none bg-gray-400/10"
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
            <div
              key={index}
              ref={currentLine === line ? currentLineRef : null}
              onClick={() => handleLineClick(index)}
              className={`cursor-pointer p-2 rounded-md transition ${
                currentLine === line ? " text-black" : "bg-transparent"
              }`}
            >
              <LyricsLine
                line={line}
                isEditing={false}
                isCurrent={currentLine === line}
                index={index}
                handleLineChange={handleLineChange}
              />
            </div>
          ))}

        {!isEditing && updatedLyrics.length === 0 && (
          <div className="h-full w-full flex justify-center flex-col items-center text-white">
            <h1>No Lyrics Found, Start Contributing</h1>
            <Button
              onClick={() => setIsEditing(true)}
              className="rounded-full mt-8 h-16 w-16 "
            >
              <EditIcon />
            </Button>
          </div>
        )}

        {isEditing && (
          <div className="mt-4 self-center">
            <Button
              onClick={submitForReview}
              className="bg-green-700 font-semibold text-lg"
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
