import { z } from "zod";
export const usernameValidation = z
  .string()
  .min(2, "username must have more than 2 characters")
  .max(15, "username should not exceed 15 characters")
  .regex(/^[a-zA-Z0-9_]+$/, "username cannnot contain special characters");

export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email({ message: "Invalid email recived" }),
  password: z
    .string()
    .min(6, { message: "Password must have 6 characters least" }),
});
