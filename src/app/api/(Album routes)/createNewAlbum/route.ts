"use server";
import dbConnect from "@/lib/dbConnect";
import AlbumModel from "@/models/AlbumModel";
import ArtistModel from "@/models/ArtistModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const { albumArtUrl, albumName, genre, singerName, releaseDate } =
      await req.json();

    // Check if an album with the same name and release date already exists
    const existingAlbum = await AlbumModel.findOne({ albumName, releaseDate });
    if (existingAlbum) {
      return NextResponse.json(
        {
          success: false,
          message: "Album already exists with the same name and release date",
        },
        { status: 400 }
      );
    }

    // Find the artist by name
    const findingArtist = await ArtistModel.findOne({ name: singerName });
    if (!findingArtist) {
      return NextResponse.json(
        {
          success: false,
          message: "Artist not found",
        },
        { status: 404 }
      );
    }

    // Create the new album
    const newAlbum = await AlbumModel.create({
      albumName,
      albumArt: albumArtUrl,
      releaseDate,
      by: findingArtist._id,
      genre,
    });

    if (!newAlbum) {
      throw new Error("Error while creating the album");
    }
    console.log("Album created successfully: ", newAlbum);

    // Update the artist's albums array
    const updatedSinger = await ArtistModel.findByIdAndUpdate(
      findingArtist._id,
      { $push: { albums: newAlbum._id } },
      { new: true }
    );

    if (!updatedSinger) {
      await AlbumModel.findByIdAndDelete(newAlbum._id);
      throw new Error(
        "Error updating the artist with the new album ID. The created album has been deleted."
      );
    }

    return NextResponse.json({
      success: true,
      message: "Album created successfully",
      result: newAlbum._id,
    });
  } catch (error: any) {
    console.error("Error occurred:", error.message);
    return NextResponse.json(
      { success: false, message: `Error occurred: ${error.message}` },
      { status: 500 }
    );
  }
}
