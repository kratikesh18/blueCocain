"use server";
import dbConnect from "@/lib/dbConnect";
import AlbumModel from "@/models/AlbumModel";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

if (!mongoose.models.Artist) {
  mongoose.model("Artist", new mongoose.Schema({ name: String }));
}
if (!mongoose.models.Album) {
  mongoose.model(
    "Album",
    new mongoose.Schema({
      by: {
        type: mongoose.Types.ObjectId,
        ref: "Artist",
      },
    })
  );
}

export async function GET(req: NextRequest) {
  await dbConnect();
  try {
    const allAlbums = await AlbumModel.find()
      .populate({
        path: "by",
        select: "name",
        model: "Artist",
        strictPopulate: false,
      }).sort({ createdAt: -1 });
    return Response.json(
      {
        success: true,
        message: "All Albmums Fetched Successfully",
        result: allAlbums,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error.message);
    return Response.json(
      {
        success: false,
        message: `Error Occured, ${error.message}`,
      },
      { status: 400 }
    );
  }
}
