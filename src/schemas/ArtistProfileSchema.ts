import { z } from "zod";

export const ArtistProfileSchema = z.object({
  name: z.string(),
  bio: z.string(),
  debutDate: z.string(),
  genre: z.string(),
  artistProfileImage: z.string(),
});
