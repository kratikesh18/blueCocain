"use client";
import React, { useEffect, useState } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NewAlbumSchema } from "@/schemas/NewAlbumSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import ArtistSearchResult from "@/components/HomepageComponents/ArtistSearchResult";
import axios from "axios";
import { z } from "zod";
import { useDebounce } from "@/hooks/useDebounce";

interface SingerDetails {
  name: string;
  _id: string;
}

const NewAlbumPage = () => {
  const params = useParams();
  const albumName = decodeURIComponent(params?.forName as string);
  const router = useRouter();

  const [artistname, setArtistname] = useState("");
  const [artistDetails, setArtistDetails] = useState<SingerDetails[] | null>(
    null
  );

  const debouncedArtistName = useDebounce(artistname, 300);
  const [findingArtist, setFindingArtist] = useState(false);

  useEffect(() => {
    const findArtists = async () => {
      setFindingArtist(true);
      if (debouncedArtistName) {
        try {
          const response = await axios.get(
            `/api/validateArtist?artistname=${debouncedArtistName}`
          );
          setArtistDetails(response.data.result);
          
        } catch (error:any) {
          console.error(error.message);
         
        }finally{
          setFindingArtist(false);
        }
      } else {
        setArtistDetails(null);
      }
    };
    findArtists();
  }, [debouncedArtistName]);

  const form = useForm<z.infer<typeof NewAlbumSchema>>({
    resolver: zodResolver(NewAlbumSchema),

    defaultValues: {
      albumArtUrl: "",
      albumName: albumName || "",
      singerName: "",
      genre: "",
      releaseDate: new Date().toISOString().split("T")[0],
    },
  });

  const onSubmit = async (data: z.infer<typeof NewAlbumSchema>) => {
    try {
      const response = await axios.post("/api/createNewAlbum", {data, artistDetails});
      console.log("Printing the response ", response);
      router.push(`/addLyrics/createLyrics/${response.data.result}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-black flex flex-col items-center justify-center py-10">
      <h1 className="text-4xl font-bold text-center mb-8 theme-text-style text-white">
        Create New Album
      </h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full max-w-lg p-8 border-[2px] border-white/20 shadow-lg rounded-lg"
        >
          <FormField
            control={form.control}
            name="albumName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Album Name</FormLabel>
                <Input
                  {...field}
                  type="text"
                  value={albumName}
                  className="text-white bg-gray-800 border-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter album name"
                  readOnly
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="singerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Singer Name</FormLabel>
                <Input
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    setArtistname(e.target.value);
                  }}
                  type="text"
                  className="text-white bg-gray-800 border-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter singer name"
                />

                <ArtistSearchResult
                  artistDetails={artistDetails}
                  artistname={artistname}
                  findingArtist={findingArtist}
                  setArtistname={setArtistname}
                  setFieldValue={field.onChange}
                />

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="releaseDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Release Date</FormLabel>
                <Input
                  {...field}
                  type="date"
                  className="text-white bg-gray-800 border-none focus:ring-2 focus:ring-blue-500"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="albumArtUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Album Art URL</FormLabel>
                <Input
                  {...field}
                  type="text"
                  className="text-white bg-gray-800 border-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter album art URL"
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Genre</FormLabel>
                <Input
                  {...field}
                  type="text"
                  className="text-white bg-gray-800 border-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter genre"
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default NewAlbumPage;
