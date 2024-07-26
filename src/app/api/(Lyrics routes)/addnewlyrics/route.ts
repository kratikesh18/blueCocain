"use server";
import dbConnect from "@/lib/dbConnect";
import AlbumModel, { Album } from "@/models/AlbumModel";
import ArtistModel, { Artist } from "@/models/ArtistModel";
import LyricsModel, { Lyrics } from "@/models/LyricsModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const { data: songDetails, currentUserId, albumId } = await req.json();
    console.log("printing data:", songDetails);
    console.log(
      "printing currentUserId:",
      currentUserId,
      "Printing albumId: ",
      albumId
    );

    const { songName, albumName, genre, singerName, releaseDate } = songDetails;

    if (
      [
        songName,
        albumName,
        genre,
        singerName,
        releaseDate,
        currentUserId,
        albumId,
      ].some((field) => !field?.trim())
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Empty fields are not acceptable",
        },
        { status: 404 }
      );
    }

    const singerDetails: Artist | null = await ArtistModel.findOne({
      name: singerName,
    });
    if (!singerDetails) {
      throw new Error("Artist with the name not found");
    }

    const newSongCreated: Lyrics = await LyricsModel.create({
      songName,
      singer: singerDetails._id,
      albumName,
      genre,
      releaseDate,
      albumDetails: albumId,
      contributedBy: currentUserId,
    });

    console.log("printing the Created songData", newSongCreated);

    // Add the new song to the artist's songs array using $push
    await ArtistModel.findByIdAndUpdate(
      singerDetails._id,
      {
        $push: { songs: newSongCreated._id },
      },
      { new: true } // This ensures you get the updated artist details
    );

    // Fetch the album and check if it has the tracks array initialized
    const fetchedAlbum = await AlbumModel.findByIdAndUpdate(
      albumId,
      {
        $push: { tracks: newSongCreated._id },
      },
      { new: true } // This ensures you get the updated album
    );

    if (!fetchedAlbum) {
      throw new Error("Error while updating the albumDetails");
    }

    console.log(
      "printing the updated version of the fetched album",
      fetchedAlbum
    );

    return NextResponse.json(
      {
        success: true,
        message: "Lyrics Creation successful",
        result: newSongCreated,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("Error Occurred:", error.message);
    return NextResponse.json(
      { success: false, message: `Error Occurred: ${error.message}` },
      { status: 404 }
    );
  }
}
