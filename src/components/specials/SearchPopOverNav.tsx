import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { debounce } from "lodash";
import { Lyrics } from "@/context/LyricsContext";
import axios from "axios";
import Link from "next/link";
import SearchTile from "../SearchTile";
import Image from "next/image";

const SearchPopOverNav = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [lyrics, setLyrics] = useState<Lyrics[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = debounce((query: string) => {
    setSearchQuery(query);
  }, 500);

  const fetchLyrics = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/lyrics?searchQuery=${query}`);
      setLyrics(response.data.results);
    } catch (error) {
      setError("Error while fetching lyrics");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (searchQuery !== "") {
      fetchLyrics(searchQuery);
    }
    if (searchQuery === "") {
      setLyrics(null);
    }
  }, [searchQuery]);

  return (
    <div className="flex justify-center items-center flex-col gap-4">
      <Input
        type="text"
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder="Search for a Lyrics"
        className="border-2 py-5 px-4 w-fit text-xl rounded-2xl active:border-none "
      />

      {/* <Button onClick={handleSearch}>Search</Button> */}
      {loading && <div className="loader"></div>}

      {error && <div>{error}</div>}

      {lyrics && (
        <div className="flex flex-col gap-4 justify-center items-center w-full">
          {lyrics.map((item) => (
            <Link href={`/lyrics/${item._id}`} key={item._id}>
              <div className="flex border-2 border-gray-400 rounded-md h-[9rem] w-[99%]">
                <div className="flex-shrink-0 w-1/3">
                  <img
                    src={item.albumArt}
                    alt={`${item.albumName} cover`}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col justify-between p-4 w-2/3">
                  <div>
                    <h1 className="text-base font-semibold text-gray-900">
                      {item.songName}
                    </h1>
                    <h2 className="text-sm text-gray-700">{item.albumName}</h2>
                  </div>
                  <div className="mt-2">
                    <h3 className="text-base font-semibold text-gray-800">
                      {item.singer.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {item.releaseDate &&
                        new Date(item.releaseDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPopOverNav;
