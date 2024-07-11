import { z } from "zod";

export const ArtistProfileSchema = z.object({
  name: z.string().trim().min(1, "Artist name is mandatory"),
  bio: z
    .string()
    .trim()
    .min(10, "Write Bio for Artist Profile of least 10 words "),
  debutDate: z.string(),
  genre: z.string().trim().min(1, "Genre is required"),
  artistProfileImage: z
    .string()
    .min(1, "Url For Artist Profile Image is Required"),
});
