import dbConnect from "@/lib/dbConnect";
import ArtistModel from "@/models/ArtistModel";
import LyricsModel from "@/models/LyricsModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const inputSearchKeyword = searchParams.get("searchQuery");

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
      $or: [{ keywords: inputSearchKeyword }, { songName: inputSearchKeyword }],
    }).populate("artist", 'name'); // Assuming the field name is "artist"

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
    return NextResponse.json(
      {
        success: false,
        message: `Error while fetching lyrics from database: ${error.message}`,
      },
      { status: 500 }
    );
  }
}
