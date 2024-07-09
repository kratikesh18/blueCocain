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

const NewArtistProfilePage = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof ArtistProfileSchema>>({
    resolver: zodResolver(ArtistProfileSchema),
    defaultValues: {
      name: "",
      bio: "",
      genre: "",
      artistProfileImage: "",
      debutDate: new Date().toISOString().split("T")[0],
    },
  });

  const createNewArtist = async (data: z.infer<typeof ArtistProfileSchema>) => {
    // Handle the form submission
    setLoading(true);
    try {
      console.log(data);
      const response = await axios.post(`api/createNewArtist`, data);
      toast({
        title: "Success",
        description: response.data.message,
      });
    } catch (error) {
      console.log("Error occurred during sign up", error);
      toast({
        title: "Failed",
        description: "Sign up failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-950 flex flex-col items-center py-10">
      <h1 className="text-white text-2xl font-medium mb-6">
        Contribute An Artist Profile
      </h1>

      <div className="w-full max-w-lg bg-gray-800 p-6 rounded-lg shadow-lg">
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
                    className="bg-gray-700 text-white"
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
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Genre</FormLabel>
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
              control={form.control}
              name="debutDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Debut Date</FormLabel>
                  <Input
                    {...field}
                    type="date"
                    className="bg-gray-700 text-white"
                  />
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
                  <Input
                    {...field}
                    type="text"
                    className="bg-gray-700 text-white"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white"
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
