import { z } from "zod";

export const NewLyricsSchema = z.object({
  songName: z.string().min(1, "Song name is mandatory"),
  singerName: z.string().min(1, "Artist is mandatory"),
  albumName: z.string(),
  albumArtUrl: z.string(),
  genre: z.string().min(1, "Genre is mandatory"),
  releaseDate: z.string().min(1, "ReleaseData is mandatory"),
});
