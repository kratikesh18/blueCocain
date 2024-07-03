import React, { useEffect, useState, useCallback } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { debounce } from "lodash";

interface SongDetails {
  albumArt: string;
  albumName: string;
  songName: string;
  genre: string;
  singerName?: SingerDetails;
  releaseDate: string;
}

interface SingerDetails {
  name: string;
  _id: string;
}

const GatherSongDetails: React.FC = () => {
  const [songDetails, setSongDetails] = useState<SongDetails>({
    albumArt: "",
    albumName: "",
    songName: "",
    genre: "",
    singerName: {
      _id: "",
      name: "",
    },
    releaseDate: "",
  });

  const [singerDetails, setSingerDetails] = useState<SingerDetails[] | null>(
    null
  );

  const validateSingerName = useCallback(
    debounce(async (inputtedSinger: string) => {
      try {
        const response = await axios.get(
          `/api/validateArtist?artistname=${inputtedSinger}`
        );
        if (response.status === 200) {
          setSingerDetails(response.data.result);
        }
      } catch (error) {
        console.error(error);
      }
    }, 500),
    []
  );

  useEffect(() => {
    if (songDetails.singerName?.name) {
      validateSingerName(songDetails.singerName.name);
    }
  }, [songDetails.singerName, validateSingerName]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSongDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
    if (name === "singerName") {
      validateSingerName(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/addnewlyrics`, { songDetails });
      if (response.status === 200) {
        console.log("Request successful");
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleSingerSelect = (singerName: SingerDetails) => {
    setSongDetails((prevDetails) => ({
      ...prevDetails,
      singerName,
    }));
    setSingerDetails(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-4 w-full max-w-md mx-auto"
    >
      <Input
        type="text"
        name="songName"
        placeholder="Song Name"
        value={songDetails.songName}
        onChange={handleChange}
        className="border-2 border-black p-2 rounded"
      />
      <Input
        type="text"
        name="singerName"
        placeholder="Singer's Name"
        value={songDetails.singerName?.name}
        onChange={handleChange}
        className="border-2 border-black p-2 rounded"
      />
      {singerDetails && (
        <ul className="border-2 border-green-500 p-2 rounded w-fit">
          {singerDetails.map((eachSinger) => (
            <li
              key={eachSinger._id}
              onClick={() => handleSingerSelect(eachSinger)}
              className="cursor-pointer hover:bg-gray-200"
            >
              {eachSinger.name}
            </li>
          ))}
        </ul>
      )}
      <Input
        type="text"
        name="albumName"
        placeholder="Album Name"
        value={songDetails.albumName}
        onChange={handleChange}
        className="border-2 border-black p-2 rounded"
      />
      <Input
        type="text"
        name="albumArt"
        placeholder="Album Art URL"
        value={songDetails.albumArt}
        onChange={handleChange}
        className="border-2 border-black p-2 rounded"
      />
      <Input
        type="text"
        name="genre"
        placeholder="Genre"
        value={songDetails.genre}
        onChange={handleChange}
        className="border-2 border-black p-2 rounded"
      />
      <Input
        type="date"
        name="releaseDate"
        placeholder="Release Date"
        value={songDetails.releaseDate}
        onChange={handleChange}
        className="border-2 border-black p-2 rounded"
      />

      <Button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Submit
      </Button>
    </form>
  );
};

export default GatherSongDetails;
