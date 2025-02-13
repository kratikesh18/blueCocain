"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Artist } from "@/models/ArtistModel";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const AllArtistsPage = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [allArtistDetails, setAllArtistDetails] = useState<Artist[] | null>(
    null
  );

  useEffect(() => {
    async function getAllArtists() {
      setLoading(true);
      try {
        const response = await axios.get(`/api/getAllArtistsDetails`);
        console.log(response.data);
        setAllArtistDetails(response.data.result);
      } catch (error: any) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    getAllArtists();
  }, []);

  if (loading) {
    return (
      <div className="h-[92.2vh] w-full flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="h-[92.2vh] overflow-y-scroll scrollbar-none ">
      <div className="container mx-auto px-4 bg-gray-500/20 p-4 rounded-md">
        <div className="text-white mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold">All Artists</h1>
          <Link href={"/"}>Create an Artists Profile</Link>
        </div>

        {error && <span className="text-red-400">{error}</span>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {allArtistDetails &&
            allArtistDetails.map((eachArtist, index) => (
              <Link
                href={`/artist/${eachArtist._id}`}
                key={index}
                className="border-transparent border ease-linear  hover:border-gray-100/30 p-6 rounded-lg shadow-lg  transition duration-500 bg-gray-500/20"
              >
                <div className="flex justify-center mb-4">
                  <img
                    src={eachArtist?.artistProfileImage}
                    alt={eachArtist.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-gray-700"
                  />
                </div>
                <h1 className="text-xl font-bold text-white mb-2 text-center">
                  {eachArtist.name}
                </h1>
                <p className="text-gray-400 text-center">{eachArtist.bio}</p>
                {/* <p className="text-gray-400 text-center mt-2">
                  {new Date(eachArtist.debutDate).toLocaleDateString()}
                </p> */}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AllArtistsPage;
