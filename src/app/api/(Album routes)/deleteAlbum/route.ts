import dbConnect from "@/lib/dbConnect";
import AlbumModel from "@/models/AlbumModel";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  await dbConnect();

  try {
    const { albumId } = await req.json();
    // console.log("printing the id : ", albumId);
    if (!albumId) {
      throw new Error("Please provide album id");
    }
    const album = await AlbumModel.findByIdAndDelete(albumId);
    // console.log(album);
    if (!album) {
      throw new Error("Album not found ");
    }
    return NextResponse.json(
      { message: "Album deleted successfully", sucess: false },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json(
      { message: error.message, sucess: false },
      { status: 500 }
    );
  }
}
