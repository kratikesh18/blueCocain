import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { useForm } from "react-hook-form";
import { NewLyricsSchema } from "@/schemas/NewLyricsSchema";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useDebounce } from "@/hooks/useDebounce";
import ArtistSearchResult from "@/components/HomepageComponents/ArtistSearchResult";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import LoadingSpinner from "./LoadingSpinner";

interface SingerDetails {
  name: string;
  _id: string;
}

interface AlbumDetails {
  _id: string;
  albumName: string;
  by: { name: string };
  releaseDate: string;
  genre: string;
}

const GatherSongDetails: React.FC<{ albumdetailsProps: AlbumDetails }> = ({
  albumdetailsProps,
}) => {
  const { data: session, status } = useSession();
  console.log("printing SEssion in New Lyrics" , session)
  if(!session){
    return <div>No session Found</div>;
  }
  const currentUserEmail = session.user?.email || "";

  const [artistname, setArtistname] = useState("");
  const [findingArtist, setFindingArtist] = useState(false);
  const debouncedArtistName = useDebounce(artistname, 300);

  const [artistDetails, setArtistDetails] = useState<SingerDetails[] | null>(null);

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const findArtists = async () => {
      setFindingArtist(true);
      try {
        if (debouncedArtistName) {
          const response = await axios.get(`/api/validateArtist?artistname=${debouncedArtistName}`);
          setArtistDetails(response.data.result || []);
        } else {
          setArtistDetails(null);
        }
      } catch (error) {
        console.error("Artist search error:", error);
      } finally {
        setFindingArtist(false);
      }
    };

    findArtists();

    return () => {
      setFindingArtist(false); // Cleanup
    };
  }, [debouncedArtistName]);

  const handleSubmit = async (data: z.infer<typeof NewLyricsSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(`/api/addnewlyrics`, {
        data,
        currentUserEmail,
        albumId: albumdetailsProps._id,
      });

      toast({
        title: "Lyrics added successfully!",
        description: response.data.message,
      });

      form.reset();
      router.push(`/lyrics/${response.data.result._id}`);
    } catch (error: any) {
      console.error("Failed to add lyrics:", error.message);
      toast({
        title: "Failed to add lyrics",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const form = useForm<z.infer<typeof NewLyricsSchema>>({
    resolver: zodResolver(NewLyricsSchema),
    defaultValues: {
      songName: "",
      singerName: albumdetailsProps.by.name || "",
      albumName: albumdetailsProps.albumName || "",
      genre: albumdetailsProps.genre || "",
      albumArtUrl: "",
      releaseDate: new Date(albumdetailsProps.releaseDate).toISOString().split("T")[0] || new Date().toISOString().split("T")[0],
    },
  });

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-black/90 flex items-center justify-center pt-20">
      <div className="p-8 rounded-lg shadow-lg w-full max-w-2xl bg-transparent border-[1px]">
        <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-b from-gray-200 via-white to-gray-600 text-transparent bg-clip-text">
          Add New Lyrics
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              name="songName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Song Name</FormLabel>
                  <Input {...field} type="text" className="bg-gray-700 text-white" />
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
                  <Input {...field} className="bg-gray-700 text-white" disabled />
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
                  <FormLabel className="text-white">
                    Album Art URL{" "}
                    <span className="text-xs italic text-gray-400">
                      (Optional)
                    </span>
                  </FormLabel>
                  <Input {...field} placeholder="https://example.org/img" className="bg-gray-700 text-white" />
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
                  <Input {...field} type="date" className="bg-gray-700 text-white" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full py-2 bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
              {isSubmitting ? "Adding Lyrics..." : "Add Lyrics"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default GatherSongDetails;
