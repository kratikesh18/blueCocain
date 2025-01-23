"use server";
import dbConnect from "@/lib/dbConnect";
import LyricsModel from "@/models/LyricsModel";
import { NextRequest, NextResponse } from "next/server";
import ArtistModel from "@/models/ArtistModel";
import mongoose from "mongoose";

// Explicitly register the models with mongoose
if (!mongoose.models.Artist) {
  mongoose.model("Artist", new mongoose.Schema({ name: String }));
}

if (!mongoose.models.Lyrics) {
  mongoose.model("Lyrics", new mongoose.Schema({ songName: String }));
}
if (!mongoose.models.NewAlbum) {
  mongoose.model(
    "NewAlbum",
    new mongoose.Schema({ albumArt: String, albumName: String })
  );
}

export async function GET(req: NextRequest) {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const songId = searchParams.get("id");

    if (!songId) {
      return NextResponse.json(
        {
          success: false,
          message: "Search id is missing",
        },
        { status: 400 }
      );
    }
    const lyricsOfTheSong = await LyricsModel.findById(songId)
      .select("-__v -createdAt -updatedAt")
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
      });

    if (lyricsOfTheSong.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No songs found, please provide valid id and try again",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Lyrics found",
        results: lyricsOfTheSong,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      {
        success: false,
        message: `Error while fetching lyrics from database: ${error.message}`,
      },
      { status: 500 }
    );
  }
}
