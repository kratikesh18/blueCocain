"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";

// Define interfaces
export interface Artist {
  _id?: string;
  name: string;
}

export interface LyricsLine {
  line: string;
  startTime: number; // Start time in seconds
  endTime: number; // End time in seconds
}

export interface Lyrics {
  _id: string;
  songName: string;
  singer: Artist;
  albumDetails: { albumArt: string; _id?: string; albumName?: string };
  albumName?: string;
  genre?: string;
  releaseDate?: Date;
  albumArt?: string;
}

export interface LyricsDetails extends Lyrics {
  lyricsText: LyricsLine[];
  keywords?: string[];
}

export interface LyricsContextType {
  lyrics: Lyrics[] | null;
  lyricsDetails: LyricsDetails | null;
  loading: boolean;
  error: string | null;
  fetchLyrics: (query: string) => void;
  fetchLyricsDetails: (id: string) => void;
  setLyrics: React.Dispatch<React.SetStateAction<Lyrics[] | null>>;
}

// Create context
export const LyricsContext = createContext<LyricsContextType | undefined>(
  undefined
);

// LyricsProvider component
export const LyricsProvider = ({ children }: { children: ReactNode }) => {
  const [lyrics, setLyrics] = useState<Lyrics[] | null>(null);
  const [lyricsDetails, setLyricsDetails] = useState<LyricsDetails | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLyrics = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/lyrics?searchQuery=${query}`);
      console.log(response);
      setLyrics(response.data.results);
    } catch (error: any) {
      setError("Lyrics Not found");
    } finally {
      setLoading(false);
    }
  };

  const fetchLyricsDetails = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/lyricsLines?id=${id}`);
      console.log("Printing the result in context", response.data.results);
      setLyricsDetails(response.data.results);
    } catch (error) {
      setError("Error while fetching Lyrics details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LyricsContext.Provider
      value={{
        lyrics,
        lyricsDetails,
        setLyrics,
        loading,
        error,
        fetchLyrics,
        fetchLyricsDetails,
      }}
    >
      {children}
    </LyricsContext.Provider>
  );
};

// Custom hook to use the LyricsContext
export const useLyrics = () => {
  const context = useContext(LyricsContext);
  if (!context) {
    throw new Error("useLyrics must be used within a LyricsProvider");
  }
  return context;
};

// const fetchLyricsDetails = async (id: string) => {
//   setLoading(true);
//   setError(null);
//   try {
//     const response = await axios.get(`/api/lyricsLines?id=${id}`);
//     console.log("Printing the result in context", response.data.results);
//     setLyricsDetails(response.data.results);
//   } catch (error) {
//     setError("Error while fetching Lyrics details");
//   } finally {
//     setLoading(false);
//   }
// };

// _id?: string;
// songName: string;
// singer: { _id?: string; name: string }; // Reference to the Artist model
// albumDetails?: {  albumArt: string;  };
// albumName?: string;
// genre?: string;
// releaseDate?: Date;
// albumArt?: string;
