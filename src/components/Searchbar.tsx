import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
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

  // useless function 
  const handleSearch = () => {
    if (searchQuery !== "") {
      fetchLyrics(searchQuery);
    }
  };

  return (
    <div className="flex mt-4  justify-center items-center mx-auto flex-col gap-4">
      <Input
        type="text"
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder="Search for a Lyrics"
        
        className="border-2 py-8 px-4 w-fit text-2xl rounded-2xl active:border-none border-gray-500 "
      />

      {/* <Button onClick={handleSearch}>Search</Button> */}
      {loading && <div className="loader"></div>}
      {error && <div>{error}</div>}
      {lyrics && (
        <div className=" flex flex-col gap-4  justify-center items-center w-[90%]">
          {lyrics.map((item) => (
            <SearchTile item={item} key={item._id} />
          ))}
        </div>
      )}
    </div>
  );
};
