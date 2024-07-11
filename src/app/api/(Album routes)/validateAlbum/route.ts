"use server";
import dbConnect from "@/lib/dbConnect";
import AlbumModel from "@/models/AlbumModel";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  // console.log(searchParams);
  const AlbumNameToSearch = searchParams.get("albumname");
  // console.log(artistNameToSearch);
  try {
    const AlbumNameArray = await AlbumModel.find({
      albumName: AlbumNameToSearch,
    }).select(
      "-bio -genre -debutDate -songs -albums -__v -createdAt -updatedAt"
    );

    if (AlbumNameArray.length === 0) {
      return Response.json(
        {
          success: false,
          message: "No Albums not found",
        },
        { status: 404 }
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
        message: "Error while finding Albums",
      },
      { status: 404 }
    );
  }
}
