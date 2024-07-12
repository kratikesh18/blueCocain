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
import ArtistSearchResult from "@/components/HomepageComponents/ArtistSearchResult";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface SingerDetails {
  name: string;
  _id: string;
}

const GatherSongDetails: React.FC = () => {
  const { data: session } = useSession();
  const currentUserId = session?.user._id;
  const [artistname, setArtistname] = useState("");
  const [findingArtist, setFindingArtist] = useState(false);
  const debouncedArtistName = useDebounce(artistname, 300);
  const [artistDetails, setArtistDetails] = useState<SingerDetails[] | null>(
    null
  );
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const findArtists = async () => {
      setFindingArtist(true);
      if (debouncedArtistName) {
        try {
          const response = await axios.get(
            `/api/validateArtist?artistname=${debouncedArtistName}`
          );
          setArtistDetails(response.data.result);
          setFindingArtist(false);
        } catch (error) {
          console.error(error);
          setFindingArtist(false);
        }
      } else {
        setArtistDetails(null);
      }
    };
    findArtists();
  }, [debouncedArtistName]);

  const handleSubmit = async (data: z.infer<typeof NewLyricsSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(`/api/addnewlyrics`, {
        data,
        currentUserId,
      });
      if (response.status === 200) {
        toast({ title: "Lyrics added successfully!" });
        form.reset();
        console.log(response);
        router.push(`/lyrics/${response.data.result._id}`);
      }
    } catch (error: any) {
      console.error(error.message);
      toast({ title: "Failed to add lyrics" });
    } finally {
      setIsSubmitting(false);
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
      releaseDate: new Date().toISOString().split("T")[0],
    },
  });

  return (
    <div className="min-h-screen bg-gray-900 flex items-start justify-center pt-20">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-b from-gray-200 via-white to-gray-600 text-transparent bg-clip-text">
          Add New Lyrics
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4 flex flex-col gap-4"
          >
            <div className="flex flex-wrap gap-4">
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
            </div>
            <div className="flex flex-wrap gap-4">
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
              <FormField
                name="releaseDate"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Release Date</FormLabel>
                    <Input
                      {...field}
                      type="date"
                      className="bg-gray-700 text-white"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding Lyrics..." : "Add Lyrics"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default GatherSongDetails;
