"use server";
import dbConnect from "@/lib/dbConnect";
import LyricsModel from "@/models/LyricsModel";
import { NextRequest } from "next/server";
import mongoose from "mongoose";
import ArtistModel from "@/models/ArtistModel";
import AlbumModel from "@/models/AlbumModel";

// Explicitly register the models with mongoose
if (!mongoose.models.Artist) {
  mongoose.model("Artist", new mongoose.Schema({ name: String }));
}

if (!mongoose.models.NewAlbum) {
  mongoose.model("NewAlbum", new mongoose.Schema({ albumArt: String }));
}
if (!mongoose.models.Lyrics) {
  mongoose.model("Lyrics", new mongoose.Schema({ songName: String }));
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const getFull = searchParams.get("inLbrary");

  await dbConnect();
  try {
    let response = null;
    if (!getFull) {
      response = await LyricsModel.find()
        .select("-lyricsText -__v -keywords -createdAt -updatedAt")
        .populate({
          path: "singer",
          select: "name",
          model: "Artist",
          strictPopulate: false,
        })
        .populate({
          path: "albumDetails",
          select: "albumArt albumName",
          model: "NewAlbum",
          strictPopulate: false,
        })
        .sort({ createdAt: -1 })
        .limit(6);
    } else {
      response = await LyricsModel.find()
        .select("-lyricsText -__v -keywords -createdAt -updatedAt")
        .populate({
          path: "albumDetails",
          select: "albumArt",
          model: "NewAlbum",
        })
        .populate({ path: "singer", select: "name", model: "Artist" })
        .sort({ createdAt: -1 });
      // .populate("singer", "name")
      // .populate("albumDetails", "albumArt")
    }

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
        message: "All Lyrics Fetching successfull",
        result: response,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        message: `Error occured while getting all lyrics : ${error.message}`,
      },
      { status: 404 }
    );
  }
}
