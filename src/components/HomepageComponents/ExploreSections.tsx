import React, { useEffect, useState } from "react";
import SearchTile, { SearchResultType } from "@/components/SearchTile";
import axios from "axios";

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
    <div className="bg-black">
      {loading ? (
        <div className="h-full w-full flex justify-center items-center mt-8">
          <div className="loader "></div>
        </div>
      ) : (
        <div>
          <div className="flex flex-col gap-4 p-7 overflow-auto text-white">
            {allItems && (
              <h1 className="text-xl text-pretty font-bold md:text-2xl">
                Explore our newest additions
              </h1>
            )}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:px-8">
              {allItems &&
                allItems.map((item) => (
                  <SearchTile item={item} key={item._id} />
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExploreSections;
