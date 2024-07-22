"use server";
import dbConnect from "@/lib/dbConnect";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

// Import and log models to ensure they are correctly imported
import ArtistModel from "@/models/ArtistModel";
import LyricsModel from "@/models/LyricsModel";

console.log("ArtistModel", ArtistModel);
console.log("LyricsModel", LyricsModel);

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
    const { searchParams } = new URL(req.url);
    const inputSearchKeyword = searchParams.get("searchQuery");
    // console.log("printing the keyword recieved to ", inputSearchKeyword);

    if (!inputSearchKeyword) {
      return NextResponse.json(
        {
          success: false,
          message: "Search query is missing",
        },
        { status: 400 }
      );
    }

    const songListsDependingUponQuery = await LyricsModel.find({
      $or: [
        { songName: inputSearchKeyword.toString() },
        { keywords: inputSearchKeyword },
      ],
    })
      .select("-lyricsText -__v -createdAt -updatedAt")
      .populate({
        path: "singer",
        select: "name",
        model: "Artist",
        strictPopulate: false,
      })
      .populate({
        path: "albumDetails",
        model: "Album",
        strictPopulate: false,
      });

    // console.log(songListsDependingUponQuery);
    if (songListsDependingUponQuery.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No songs found, please check your spelling and try again",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Lyrics found",
        results: songListsDependingUponQuery,
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
