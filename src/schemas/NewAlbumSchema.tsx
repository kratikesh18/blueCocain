import { z } from "zod";
export const NewAlbumSchema = z.object({
  albumName: z.string().min(1, "Album is Mandatory"),
  albumArtUrl: z.string().min(1, "AlbumArt is Mandatory"),
  genre: z.string(),
  singerName: z.string(),
  releaseDate: z.string(),
});
