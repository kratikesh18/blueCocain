import React, { useEffect, useState } from "react";
import SearchTile, { SearchResultType } from "@/components/SearchTile";
import axios from "axios";
import { Searchbar } from "../Searchbar";

const ExploreSections = ({}) => {
  const [allItems, setAllItems] = useState<SearchResultType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getAllLyrics() {
      setLoading(true);
      try {
        const response = await axios.get(`/api/allLyrics`);

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
    <div className="border container mt-0 rounded-lg bg-opacity-10 border-white/20">
      <div>
        <div className="flex flex-col gap-4 py-7 px-2 overflow-auto text-white">
          <Searchbar />

          <h1 className="text-xl text-pretty font-bold md:text-2xl">
            Explore our newest additions
          </h1>

          {loading ? (
            <div className="h-full w-full flex justify-center items-center mt-8">
              <div className="loader "></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:px-8 overflow-hidden">
              {allItems &&
                allItems.map((item) => (
                  <SearchTile item={item} key={item._id} />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExploreSections;
