"use client";
import LyricsInfoTile from "@/components/LyricsInfoTile";
import SearchTile, { SearchResultType } from "@/components/SearchTile";
import axios from "axios";
import React, { useEffect, useState } from "react";

const AllLyricsPage = () => {
  const [allItems, setAllItems] = useState<SearchResultType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {                                                               
    async function getAllLyrics() {
      setLoading(true);
      try {
        const response = await axios.get(`/api/allLyrics?inLbrary=true`);
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
    getAllLyrics();
  }, []);

  return (
    <div className="flex flex-wrap gap-4 min-h-screen bg-black">
      {allItems?.map((eachItem) => (
        <SearchTile item={eachItem} key={eachItem._id} />
      ))}
    </div>
  );
};

export default AllLyricsPage;
