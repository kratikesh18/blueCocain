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
    <div className=" container bg-gray-500/10 p-4 h-[92.2vh] overflow-y-scroll scrollbar-none rounded-md  ">
      <div className="gap-4 grid grid-cols-3">
        {allItems?.map((eachItem) => (
          <SearchTile item={eachItem} key={eachItem._id} />
        ))}
      </div>
    </div>
  );
};

export default AllLyricsPage;
