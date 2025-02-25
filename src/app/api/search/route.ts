import dbConnect from "@/lib/dbConnect";
import ArtistModel from "@/models/ArtistModel";
import LyricsModel from "@/models/LyricsModel";
import AlbumModel1 from "@/models/NewAlbumModel";
import { NextRequest, NextResponse } from "next/server";

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

    console.log("printing the keyword recieved to ", inputSearchKeyword);

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
        select: "albumArt",
        model: "NewAlbum",
        strictPopulate: false,
      });

    const albumListsDependingUponQuery = await AlbumModel1.find({
      $or: [
        { albumName: inputSearchKeyword.toString() },
        { keywords: inputSearchKeyword },
      ],
    }).select("-__v -createdAt -updatedAt -tracks -by -genre");

    // console.log(albumListsDependingUponQuery);

    const artistListsDependingUponQuery = await ArtistModel.find({
      $or: [
        { name: inputSearchKeyword.toString() },
        { keywords: inputSearchKeyword },
      ],
    }).select("name _id artistProfileImage");
    // console.log(artistListsDependingUponQuery);

    return NextResponse.json(
      {
        success: true,
        songListsDependingUponQuery,
        albumListsDependingUponQuery,
        artistListsDependingUponQuery,
        message: "Results found",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: `Error: ${error.message}`,
      },
      { status: 500 }
    );
  }
}
