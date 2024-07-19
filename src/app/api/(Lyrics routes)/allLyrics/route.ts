"use server";
import dbConnect from "@/lib/dbConnect";
import mongoose from "mongoose";
import LyricsModel from "@/models/LyricsModel";
import { NextRequest } from "next/server";

// Explicitly register the models with mongoose
if (!mongoose.models.Artist) {
  mongoose.model("Artist", new mongoose.Schema({ name: String }));
}

if (!mongoose.models.Lyrics) {
  mongoose.model("Lyrics", new mongoose.Schema({ songName: String }));
}

export async function GET(req: NextRequest) {
  await dbConnect();
  try {
    const response = await LyricsModel.find()
      .select("-lyricsText -__v -keywords -createdAt -updatedAt")
      .populate("singer", "name")
      .populate("albumDetails", "albumArt")
      .sort({ createdAt: -1 })
      .limit(6);

    if (!response) {
      return Response.json(
        {
          success: false,
          message: "Error occured while getting all lyrics from ",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "All Lyrics Fetched successfull",
        result: response,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Error occured while getting all lyrics",
      },
      { status: 404 }
    );
  }
}
