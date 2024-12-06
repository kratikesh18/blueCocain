"use server";
import dbConnect from "@/lib/dbConnect";
import AlbumModel from "@/models/AlbumModel";
import ArtistModel from "@/models/ArtistModel";
import LyricsModel from "@/models/LyricsModel";
import UserModel from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { data: songDetails, currentUserEmail, albumId } = await req.json();
    const { songName, albumName, genre, singerName, releaseDate } = songDetails;

    console.log(songDetails, currentUserEmail)
    // Validate required fields
    if (
      [
        songName,
        albumName,
        genre,
        singerName,
        releaseDate,
        currentUserEmail,
        albumId,
      ].some((field) => field?.trim() === "")
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required and cannot be empty",
        },
        { status: 400 }
      );
    }

    // Check if the user, album, and artist exist
    const [singerDetails, albumDetails, userDetails] = await Promise.all([
      ArtistModel.findOne({ name: singerName }).exec(),
      AlbumModel.findById(albumId).exec(),
      UserModel.findOne({email:currentUserEmail}).exec(),
    ]);

    if (!singerDetails) {
      return NextResponse.json(
        { success: false, message: "Artist not found" },
        { status: 404 }
      );
    }

    if (!albumDetails) {
      return NextResponse.json(
        { success: false, message: "Album not found" },
        { status: 404 }
      );
    }

    if (!userDetails) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Create the new song/lyrics entry
    const newSongCreated = await LyricsModel.create({
      songName,
      singer: singerDetails._id,
      albumName,
      genre,
      releaseDate,
      albumDetails: albumId,
      contributedBy: userDetails._id,
    });

    if (!newSongCreated) {
      throw new Error("Failed to create lyrics");
    }

    // Update the artist, album, and user with the new song ID
    const [artistUpdate, albumUpdate, userUpdate] = await Promise.all([
      ArtistModel.findByIdAndUpdate(
        singerDetails._id,
        { $push: { songs: newSongCreated._id } },
        { new: true }
      ).exec(),
      AlbumModel.findByIdAndUpdate(
        albumId,
        { $push: { tracks: newSongCreated._id } },
        { new: true }
      ).exec(),
      UserModel.findByIdAndUpdate(
        userDetails._id,
        { $push: { contributedLyrics: newSongCreated._id } },
        { new: true }
      ).exec(),
    ]);

    if (!artistUpdate || !albumUpdate || !userUpdate) {
      await LyricsModel.findByIdAndDelete(newSongCreated._id);
      throw new Error(
        "Failed to update artist, album, or user. Lyrics creation has been rolled back."
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Lyrics creation successful",
        result: newSongCreated,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error Occurred:", error.message);
    return NextResponse.json(
      { success: false, message: `Error Occurred: ${error.message}` },
      { status: 500 }
    );
  }
}
