import dbConnect from "@/lib/dbConnect";
import AlbumModel from "@/models/AlbumModel";
import ArtistModel from "@/models/ArtistModel";
import AlbumModel1 from "@/models/NewAlbumModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await dbConnect();
  const session = await mongoose.startSession();
  session.startTransaction(); // Begin the transaction

  try {
    const { data, artistDetails } = await req.json();
    const { albumName, albumArtUrl, genre, releaseDate } = data;
    const { name: artistName, _id: artistId } = artistDetails[0];

    // Validate input data
    if (!albumName || !albumArtUrl || !releaseDate || !artistId) {
      return NextResponse.json(
        { message: "Please provide all the required fields", success: false },
        { status: 400 }
      );
    }

    // Check if the album already exists
    const existingAlbum = await AlbumModel1.findOne({ albumName });
    if (existingAlbum) {
      return NextResponse.json(
        { message: "Album already exists", success: false },
        { status: 400 }
      );
    }

    // Create a new album
    const newAlbum = await AlbumModel1.create(
      [
        {
          albumName,
          albumArt: albumArtUrl,
          genre,
          releaseDate,
          by: [artistId],
        },
      ],
      { session }
    );

    if (!newAlbum || newAlbum.length === 0) {
      throw new Error("Failed to create album");
    }

    // Update the artist with the new album ID
    const updatedArtist = await ArtistModel.updateOne(
      { _id: artistId },
      { $push: { albums: newAlbum[0]._id } },
      { session }
    );

    if (updatedArtist.modifiedCount === 0) {
      throw new Error("Failed to update artist with new album");
    }

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return NextResponse.json(
      {
        success: true,
        message: "Album created successfully",
        result: newAlbum[0]._id,
        data: newAlbum[0]
      },
      { status: 200 }
    );
  } catch (error: any) {
    // Abort the transaction on error
    await session.abortTransaction();
    session.endSession();

    return NextResponse.json(
      { message: error.message, success: false },
      { status: 500 }
    );
  }
}
