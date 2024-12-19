import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { debounce } from "lodash";
import { useLyrics } from "@/context/LyricsContext";
import SearchTile from "./SearchTile";

export const Searchbar = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { lyrics, loading, error, fetchLyrics, setLyrics } = useLyrics();

  const handleInputChange = debounce((query: string) => {
    setSearchQuery(query);
  }, 500);

  useEffect(() => {
    if (searchQuery !== "") {
      fetchLyrics(searchQuery);
    }
    if (searchQuery === "") {
      setLyrics(null);
    }
  }, [searchQuery]);

  return (
    <div className="flex py-8 justify-center items-center mx-auto flex-col gap-4">
      <Input
        type="text"
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder="Search for Lyrics "
        className="border-2 text-lg py-7 font-semibold px-4 w-fit rounded-xl bg-gray-900 text-white border-gray-300 focus:outline-none focus:border-blue-500  md:text-2xl"
      />

      {loading && <div className="loader"></div>}
      
      {error && (
        <div className={`text-red-700 ${error ? "block" : "hidden"}`}>
          {error}
        </div>
      )}
      {lyrics && (
        <div className="flex flex-col gap-4 justify-center items-center w-[90%]">
          {lyrics.map((item) => (
            <SearchTile item={item} key={item._id} />
          ))}
        </div>
      )}
    </div>
  );
};
