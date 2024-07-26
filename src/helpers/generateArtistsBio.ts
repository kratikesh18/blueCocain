// utils/generateArtistBio.ts

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not defined in the environment variables");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export async function generateArtistBio(artistName: string): Promise<string> {
  try {
    const chatSession = model.startChat({
      generationConfig,
    });

    const result = await chatSession.sendMessage(
      `Write a short and crispy profile bio for artist ${artistName} in 30 words, without including the name, give debutedate in ISO 8601 format, and genre (only one) seperately`
    );

    return result.response.text();
  } catch (error) {
    console.error("Error generating artist bio:", error);
    throw new Error("Failed to generate artist bio");
  }
}
