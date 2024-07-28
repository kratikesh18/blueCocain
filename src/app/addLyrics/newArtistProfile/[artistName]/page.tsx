"use client";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ArtistProfileSchema } from "@/schemas/ArtistProfileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { useParams, useRouter } from "next/navigation";
import SparklesIcon from "@/components/icons/SparklesIcon";
import LoadingSpinner from "@/components/LoadingSpinner";

interface AiGeneratedDataType {
  bio: string;
  debutedate: string;
  genre: string;
}

const NewArtistProfilePage = () => {
  const router = useRouter();
  const params = useParams();
  const artistName = decodeURIComponent(params?.artistName as string);
  const [loading, setLoading] = useState(false);
  const [generatedBio, setGeneratedBio] = useState<string | null>(null);
  const [aiGenerateData, setAiGenerateData] =
    useState<AiGeneratedDataType | null>(null);

  const form = useForm<z.infer<typeof ArtistProfileSchema>>({
    resolver: zodResolver(ArtistProfileSchema),
    defaultValues: {
      name: artistName,
      artistProfileImage: "",
      bio: "",
      debutDate: new Date().toISOString().split("T")[0],
    },
  });

  const createNewArtist = async (data: z.infer<typeof ArtistProfileSchema>) => {
    setLoading(true);
    try {
      const response = await axios.post(`/api/createNewArtist`, data);
      toast({
        title: "Success",
        description: response.data.message,
      });
      router.back();
    } catch (error: any) {
      toast({
        title: "Failed",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateBio = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`/api/autoBio?name=${artistName}`);
      setGeneratedBio(response.data.bio);
      setAiGenerateData(response.data.result);
      form.setValue("bio", response.data.result.bio);
      form.setValue("genre", response.data.result.genre);
      form.setValue("debutDate", response.data.result.debutedate);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-800 to-black flex flex-col items-center py-10">
      <h1 className="text-white theme-text-style text-2xl font-medium mb-6">
        Contribute An Artist Profile
      </h1>

      <div className="w-full max-w-lg bg-white bg-opacity-5 backdrop-filter backdrop-blur-lg p-6 rounded-lg shadow-lg">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(createNewArtist)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Singer Name</FormLabel>
                  <Input
                    {...field}
                    type="text"
                    className=" text-white/60"
                    readOnly
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Bio</FormLabel>
                  <div className="relative flex items-center">
                    <Input
                      {...field}
                      type="text"
                      className=" text-white pr-20 py-2 border border-gray-300 rounded"
                    />
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        handleGenerateBio();
                      }}
                      className="absolute right-0 text-xs bg-transparent rounded-l-none hover:bg-gray-900 transition-colors ease-in-out duration-300"
                    >
                      <div className="flex justify-center items-center gap-1">
                        <SparklesIcon />
                        Use AI
                      </div>
                    </Button>
                  </div>
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
                  <Input {...field} type="text" className=" text-white" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="debutDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Debut Date</FormLabel>
                  <Input {...field} type="date" className=" text-white" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="artistProfileImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">
                    Artists Image URL
                  </FormLabel>
                  <Input {...field} type="text" className=" text-white" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white"
              disabled={loading}
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default NewArtistProfilePage;
