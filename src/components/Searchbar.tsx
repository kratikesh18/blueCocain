import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { debounce } from "lodash";
import axios from "axios";
import SearchTile from "./SearchTile";

export interface SearchResultType {
  _id: string;
  songName: string;
  artist: { _id?: string; name: string }; // Reference to the Artist model
  albumName?: string;
  genre?: string;
  releaseDate?: Date;
}

export const Searchbar = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [searchResults, setSearchResults] = useState<SearchResultType[] | null>(
    null
  );

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `/api/lyrics?searchQuery=${searchQuery}`
      );

      setSearchResults(response.data.results);
    } catch (error) {
      setError("Failed to fetch lyrics. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery !== "") {
      handleSearch();
    } else {
      setSearchResults(null);
    }
  }, [searchQuery]);

  const handleInputChange = debounce((query: string) => {
    setSearchQuery(query.toLowerCase());
  }, 500);

  return (
    <div className="flex mt-4 max-w-md justify-center items-center mx-auto flex-col gap-4">
      <Input
        type="text"
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder="Search for a Lyrics"
        className="border-2 text-2xl active:border-none border-gray-500 sm:w-fit bg-white py-6 rounded-2xl"
      />
      <Button onClick={handleSearch}>search</Button>
      {!searchResults && loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}

      {searchResults && (
        <div className=" flex flex-col gap-4 p-4 justify-center items-center w-[90%]">
          {searchResults.map((item, index) => (
            <SearchTile key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};
