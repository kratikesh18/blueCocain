import dbConnect from "@/lib/dbConnect";
import ArtistModel from "@/models/ArtistModel";
import LyricsModel from "@/models/LyricsModel";
import mongoose from "mongoose";
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
      .populate("singer", "name");

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