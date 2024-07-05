import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { useForm } from "react-hook-form";
import { NewLyricsSchema } from "@/schemas/NewLyricsSchema";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useDebounce } from "@/hooks/useDebounce"; // Custom debounce hook

interface SingerDetails {
  name: string;
  _id: string;
}

const GatherSongDetails: React.FC = () => {
  const [artistname, setArtistname] = useState("");
  const debouncedArtistName = useDebounce(artistname, 300);
  const [artistDetails, setArtistDetails] = useState<SingerDetails[] | null>(
    null
  );

  useEffect(() => {
    const findArtists = async () => {
      if (debouncedArtistName) {
        try {
          const response = await axios.get(
            `/api/validateArtist?artistname=${debouncedArtistName}`
          );
          setArtistDetails(response.data.result);
        } catch (error) {
          console.error(error);
        }
      } else {
        setArtistDetails(null); // Reset artist details if input is empty
      }
    };
    findArtists();
  }, [debouncedArtistName]);

  const handleSubmit = async (data: z.infer<typeof NewLyricsSchema>) => {
    console.log("Printing the data ", data);
    try {
      const response = await axios.post(`/api/addnewlyrics`, { data });
      if (response.status === 200) {
        console.log("Request successful");
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const form = useForm<z.infer<typeof NewLyricsSchema>>({
    resolver: zodResolver(NewLyricsSchema),
    defaultValues: {
      songName: "",
      singerName: "",
      albumName: "",
      genre: "",
      albumArtUrl: "",
    },
  });

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Add New Lyrics
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              name="songName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Song Name</FormLabel>
                  <Input
                    {...field}
                    type="text"
                    className="bg-gray-700 text-white"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="singerName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Artist</FormLabel>
                  <Input
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setArtistname(e.target.value);
                    }}
                    className="bg-gray-700 text-white"
                  />
                  {artistDetails && (
                    <p className="text-sm text-gray-400 mt-1">
                      Found Artist: <span>{artistDetails[0].name}</span>
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="albumName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Album</FormLabel>
                  <Input {...field} className="bg-gray-700 text-white" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="genre"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Genre</FormLabel>
                  <Input {...field} className="bg-gray-700 text-white" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="albumArtUrl"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Album Art URL</FormLabel>
                  <Input
                    {...field}
                    placeholder="https://example.org/img"
                    className="bg-gray-700 text-white"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700"
            >
              Add Lyrics
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default GatherSongDetails;
// const handleSingerSelect = (singerName: SingerDetails) => {
//   setSongDetails((prevDetails) => ({
//     ...prevDetails,
//     singerName,
//   }));
//   setSingerDetails(null);
// };

// const [songDetails, setSongDetails] = useState<SongDetails>({
//   albumArt: "",
//   albumName: "",
//   songName: "",
//   genre: "",
//   singerName: {
//     _id: "",
//     name: "",
//   },
//   releaseDate: "",
// });

// const [singerDetails, setSingerDetails] = useState<SingerDetails[] | null>(
//   null
// );

// const validateSingerName = useCallback(
//   debounce(async (inputtedSinger: string) => {
//     try {
//       const response = await axios.get(
//         `/api/validateArtist?artistname=${inputtedSinger}`
//       );
//       if (response.status === 200) {
//         setSingerDetails(response.data.result);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }, 500),
//   []
// );

// useEffect(() => {
//   if (songDetails.singerName?.name) {
//     validateSingerName(songDetails.singerName.name);
//   }
// }, [songDetails.singerName, validateSingerName]);

// const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   const { name, value } = e.target;
//   setSongDetails((prevDetails) => ({
//     ...prevDetails,
//     [name]: value,
//   }));
//   if (name === "singerName") {
//     validateSingerName(value);
//   }
// };

// <form
//   onSubmit={handleSubmit}
//   className="flex flex-col gap-4 p-4 w-full max-w-md mx-auto"
// >
//   <Input
//     type="text"
//     name="songName"
//     placeholder="Song Name"
//     value={songDetails.songName}
//     onChange={handleChange}
//     className="border-2 border-black p-2 rounded"
//   />
//   <Input
//     type="text"
//     name="singerName"
//     placeholder="Singer's Name"
//     value={songDetails.singerName?.name}
//     onChange={handleChange}
//     className="border-2 border-black p-2 rounded"
//   />
//   {singerDetails && (
//     <ul className="border-2 border-green-500 p-2 rounded w-fit">
//       {singerDetails.map((eachSinger) => (
//         <li
//           key={eachSinger._id}
//           onClick={() => handleSingerSelect(eachSinger)}
//           className="cursor-pointer hover:bg-gray-200"
//         >
//           {eachSinger.name}
//         </li>
//       ))}
//     </ul>
//   )}
//   <Input
//     type="text"
//     name="albumName"
//     placeholder="Album Name"
//     value={songDetails.albumName}
//     onChange={handleChange}
//     className="border-2 border-black p-2 rounded"
//   />
//   <Input
//     type="text"
//     name="albumArt"
//     placeholder="Album Art URL"
//     value={songDetails.albumArt}
//     onChange={handleChange}
//     className="border-2 border-black p-2 rounded"
//   />
//   <Input
//     type="text"
//     name="genre"
//     placeholder="Genre"
//     value={songDetails.genre}
//     onChange={handleChange}
//     className="border-2 border-black p-2 rounded"
//   />
//   <Input
//     type="date"
//     name="releaseDate"
//     placeholder="Release Date"
//     value={songDetails.releaseDate}
//     onChange={handleChange}
//     className="border-2 border-black p-2 rounded"
//   />

//   <Button type="submit" className="bg-blue-500 text-white p-2 rounded">
//     Submit
//   </Button>
// </form>
//   );
// };

// export default GatherSongDetails;
