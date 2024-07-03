"use client";
import LyricsInfoTile from "@/components/LyricsInfoTile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLyrics } from "@/context/LyricsContext";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type lyricsLineInputType = {
  line?: string;
  startTime?: number; // Start time in seconds
  endTime?: number; // End time in seconds
};

const EditLyricsPage = () => {
  const { songId } = useParams();
  const { loading, error, lyricsDetails, fetchLyricsDetails } = useLyrics();
  const [newLyricsArray, setNewLyricsArray] = useState<lyricsLineInputType[]>(
    []
  );

  useEffect(() => {
    if (songId) {
      fetchLyricsDetails(songId.toString());
    }
  }, [songId]);

  useEffect(() => {
    if (lyricsDetails) {
      setNewLyricsArray(lyricsDetails.lyricsText);
    }
  }, [lyricsDetails]);

  const handleLineChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updatedLyrics = newLyricsArray.map((line, i) =>
      i === index ? { ...line, [field]: value } : line
    );
    setNewLyricsArray(updatedLyrics);
  };

  const submitForReview = async () => {
    try {
      const response = await axios.post(`/api/contribute`, { newLyricsArray });
      if (response.status === 200) {
        console.log("Successfully submitted for review");
      }
    } catch (error: any) {
      console.error("Error submitting for review:", error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <LyricsInfoTile lyricsDetails={lyricsDetails} />
      <div>
        {newLyricsArray.map((eachLine, index) => (
          <div className="text-2xl font-semibold p-4" key={index}>
            <Input
              defaultValue={eachLine.line}
              className="border-2 border-black my-2"
              onChange={(e) => handleLineChange(index, "line", e.target.value)}
            />
            <div className="flex">
              <Input
                type="number"
                className="border-2 border-black"
                defaultValue={eachLine.startTime}
                onChange={(e) =>
                  handleLineChange(index, "startTime", parseInt(e.target.value))
                }
              />
              <Input
                type="number"
                className="border-2 border-black"
                defaultValue={eachLine.endTime}
                onChange={(e) =>
                  handleLineChange(index, "endTime", parseInt(e.target.value))
                }
              />
            </div>
          </div>
        ))}
        <div className="flex gap-2 px-4 flex-col">
          <div>
            <Input
              type="text"
              placeholder="new line"
              className="border-b-2 border-black "
            />
          </div>
          <div className="flex">
            <Input
              type="text"
              placeholder="new line"
              className="border-b-2 border-black "
            />
            <Input
              type="text"
              placeholder="new line"
              className="border-b-2 border-black "
            />
          </div>
          <Button>Add Line</Button>
        </div>
        <Button onClick={submitForReview} className="mt-4">
          Submit for Review
        </Button>
      </div>
    </div>
  );
};

export default EditLyricsPage;
