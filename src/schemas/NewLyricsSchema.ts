import { z } from "zod";

export const NewLyricsSchema = z.object({
  songName: z.string(),
  singerName: z.string(),
  albumName: z.string(),
  albumArtUrl: z.string(),
  genre: z.string(),
  releaseDate: z.date(),
});
