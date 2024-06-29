import { LyricsContext } from "@/context/LyricsContext";
import { useContext } from "react";

export const useLyrics = () => {
  const context = useContext(LyricsContext);
  
  if (!context) {
    throw new Error("useLyrics must be used within a LyricsProvider");
  }
  return context;
};
