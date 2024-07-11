"use server";
import dbConnect from "@/lib/dbConnect";
import AlbumModel from "@/models/AlbumModel";
import { result } from "lodash";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  await dbConnect();

  const allAlbums = await AlbumModel.find().populate("by","name");
  
  return Response.json(
    {
      success: true,
      message: "All Albmums Fetched Successfully",
      result: allAlbums,
    },
    { status: 200 }
  );
}
