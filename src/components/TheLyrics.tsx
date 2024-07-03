"use client";
import { useLyrics } from "@/context/LyricsContext";
import React, { useEffect, useState } from "react";
import LyricsInfoTile from "./LyricsInfoTile";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { Toaster } from "./ui/toaster";
import { useToast } from "./ui/use-toast";
import { LyricsLine } from "@/models/LyricsModel";

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
  const [newLine, setNewLine] = useState<string>("");
  const [updatedLyrics, setUpdatedLyrics] = useState<LyricsLine[]>([]);
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

  const addLine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLine.trim()) return;

    const lastLine = updatedLyrics[updatedLyrics.length - 1];
    const newStartTime = lastLine ? lastLine.endTime : 0;
    const newEndTime = newStartTime + 5;

    setUpdatedLyrics((prev) => [
      ...prev,
      { line: newLine, startTime: newStartTime, endTime: newEndTime },
    ]);
    setNewLine("");
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

  if (loading)
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <div className="loader"></div>
      </div>
    );

  if (error) return <div>{error}</div>;

  if (!lyricsDetails)
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <div className="loader"></div>
      </div>
    );

  const currentLine = getCurrentLine();

  //flex flex-col gap-4 text-left h-full text-2xl font-semibold w-full mt-4 p-4 bg-white shadow-lg rounded-lg md:justify-center md:w-1/2 overflow-y-auto
  // flex flex-col gap-4 text-left text-2xl font-semibold w-full mt-4 p-4 bg-white shadow-lg rounded-lg md:w-1/2 md:h-[95%] md:overflow-y-scroll

  return (
    <div className="flex flex-col justify-center h-screen items-center p-4 md:flex-row ">
      <div className="md:w-1/2 ">
        <LyricsInfoTile lyricsDetails={lyricsDetails} />
      </div>
      <div className="flex flex-col gap-4 text-left h-full text-2xl font-semibold w-full mt-4 p-4 bg-white shadow-lg rounded-lg overflow-y-auto md:w-1/2 md:overflow-y-scroll  ">
        {updatedLyrics.map((line, index) => (
          <div
            key={index}
            className={`p-2 rounded transition-all duration-300 ${
              currentLine === line ? "bg-blue-100" : ""
            }`}
          >
            {isEditing ? (
              <div className="flex">
                <Input
                  type="text"
                  className="text-2xl font-semibold border-b-2 border-black"
                  defaultValue={line.line}
                  onChange={(e) =>
                    handleLineChange(index, "line", e.target.value)
                  }
                />
              </div>
            ) : (
              <h1 className={`${currentLine === line ? "text-blue-600" : ""}`}>
                {line.line}
              </h1>
            )}
            <div className="flex justify-between text-xs text-gray-400">
              <p>
                {new Date(line.startTime * 1000).toISOString().substr(14, 5)}
              </p>
              <p>{new Date(line.endTime * 1000).toISOString().substr(14, 5)}</p>
            </div>
          </div>
        ))}
        {isEditing && (
          <form onSubmit={addLine} className="flex gap-2 mt-4">
            <Input
              type="text"
              className="text-2xl font-semibold border-b-2 border-black"
              placeholder="Add a new line..."
              value={newLine}
              onChange={(e) => setNewLine(e.target.value)}
            />
            <Button type="submit">Add Line</Button>
          </form>
        )}
      </div>
      {isEditing && (
        <div className="mt-4">
          <Button onClick={submitForReview} className="bg-green-700">
            Mark for review
          </Button>
          <Toaster />
        </div>
      )}
    </div>
  );
};

export default TheLyrics;
