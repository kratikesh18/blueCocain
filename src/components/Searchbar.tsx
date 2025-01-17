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
    <div className="flex justify-center items-center mx-auto flex-col gap-4">
      <Input
        type="text"
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder="Search for Lyrics "
        className="text-lg py-7 font-semibold px-4 w-fit rounded-xl bg-gray-200/10 border border-white/20 text-white focus:outline-none focus:border-purple-400/60  md:text-2xl placeholder:text-gray-300/90"
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
