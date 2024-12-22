"use server";
import dbConnect from "@/lib/dbConnect";
import AlbumModel from "@/models/AlbumModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const albumIdForDetails = searchParams.get("albumId");

  if (!albumIdForDetails) {
    return NextResponse.json(
      { success: false, message: "albumId query parameter is missing" },
      { status: 400 }
    );
  }

  await dbConnect();
  try {
    const albumDBInfo = await AlbumModel.findById(albumIdForDetails)
      .populate({
        path: "by",
        select: "name",
        model: "Artist",
        strictPopulate: false,
      })
      .populate({
        path: "tracks",
        select: "-lyricsText",
        model: "Lyrics",
        strictPopulate: false,
        populate: {
          path: "singer",
          select: "name",
          model: "Artist",
          strictPopulate: false,
        },
      });

    if (!albumDBInfo) {
      return NextResponse.json(
        { success: false, message: "Album not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Album Data for given id fetched successfully",
      result: albumDBInfo,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: `Error Occurred: ${error.message}` },
      { status: 500 }
    );
  }
}
