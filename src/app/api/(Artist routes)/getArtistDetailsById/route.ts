"use server";
import dbConnect from "@/lib/dbConnect";
import ArtistModel from "@/models/ArtistModel";
import LyricsModel from "@/models/LyricsModel";
import mongoose from "mongoose";
import { NextRequest } from "next/server";
if (LyricsModel) {
  console.log(LyricsModel);
}
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const artistId = searchParams.get("artistId");

  if (!artistId) {
    throw new Error("ArtistId Not found");
  }
  if (!mongoose.Types.ObjectId.isValid(artistId)) {
    return Response.json(
      {
        sucess: false,
        message: `Invalid Search Parameter, Provide Valid ObjectId`,
      },
      { status: 404 }
    );
  }
  await dbConnect();

  try {
    const fetchedArtistDetails = await ArtistModel.findById(artistId)
      .populate({
        path: "songs",
        model: "Lyrics",
        strictPopulate: false,
        select:
          "-lyricsText -contributedBy -singer -keywords -createdAt -updatedAt -__v -readyToPulish",
        populate: {
          path: "albumDetails",
          model: "NewAlbum",
          select: "albumName -_id createdAt albumArt",
          options: { sort: { createdAt: -1 } },
          // strictPopulate: false,
        },
      })

      .populate({
        path: "albums",
        model: "NewAlbum",
        strictPopulate: false,
        options: { sort: { createdAt: -1 } },
      });

    if (fetchedArtistDetails) {
      return Response.json({
        success: true,
        message: "Artist Details Fetched Successfully ",
        result: fetchedArtistDetails,
      });
    }
  } catch (error: any) {
    console.log(error.message);

    return Response.json(
      {
        sucess: false,
        message: ``,
        result: null,
      },
      { status: 500 }
    );
  }
}
