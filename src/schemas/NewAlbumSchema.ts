import { z } from "zod";

export const NewAlbumSchema = z.object({
  albumName: z.string().min(1, "Album is Mandatory"),
  albumArtUrl: z.string().min(1, "AlbumArt is Mandatory"),
  genre: z.string().trim().min(1, "Genre is Mandatory"),
  singerName: z.string().min(1, "Singer Name is Mandatory"),
  releaseDate: z.string().min(1, "Release Date is Mandatory"),
});
