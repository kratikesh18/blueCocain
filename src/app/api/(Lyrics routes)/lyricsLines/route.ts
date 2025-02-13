"use server";
import dbConnect from "@/lib/dbConnect";
import LyricsModel from "@/models/LyricsModel";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

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

    const lyricsOfTheSong = await LyricsModel.aggregate([
      {
        $match: {
          _id: new ObjectId(songId),
        },
      },
      {
        $lookup: {
          from: "newalbums",
          localField: "albumDetails",
          foreignField: "_id",
          as: "albumDetails",
          pipeline: [
            {
              $project: {
                albumName: 1,
                albumArt: 1,
              },
            },
          ],
        },
      },
      { $unwind: "$albumDetails" },
      {
        $lookup: {
          from: "artists",
          localField: "singer",
          foreignField: "_id",
          as: "singer",
          pipeline: [
            {
              $project: {
                name: 1,
              },
            },
          ],
        },
      },
      { $unwind: "$singer" },
    ]);

    if (!lyricsOfTheSong.length) {
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
        results: lyricsOfTheSong[0],
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
