import dbConnect from "@/lib/dbConnect";
import AlbumModel from "@/models/AlbumModel";
import AlbumModel1 from "@/models/NewAlbumModel";
import mongoose from "mongoose";
import { NextRequest } from "next/server";


export async function GET(req: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  // console.log(searchParams);
  const AlbumIdToSearch = searchParams.get("albumId");
  const AlbumNameToSearch = searchParams.get("albumname");
  // console.log(AlbumIdToSearch, AlbumNameToSearch);

  try {
    const AlbumNameArray = await AlbumModel1.find({
      $or: [{ _id: AlbumIdToSearch }, { albumName: AlbumNameToSearch }],
    })
      .select("-tracks -__v -createdAt -updatedAt")
      .populate({
        path: "by",
        select: "name -_id",
        model: "Artist",
        strictPopulate: false,
      });
    // console.log(AlbumNameArray);

    if (AlbumNameArray.length === 0) {
      return Response.json(
        {
          success: true,
          message: "No Albums not found You Can create one",
          result: [],
        },
        { status: 200 }
      );
    }
    return Response.json(
      {
        success: true,
        result: AlbumNameArray,
        message: "Albums found",
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: `Error while finding Albums ${error}`,
      },
      { status: 500 }
    );
  }
}
