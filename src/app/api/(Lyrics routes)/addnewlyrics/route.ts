"use server";
import dbConnect from "@/lib/dbConnect";
import AlbumModel, { Album } from "@/models/AlbumModel";
import ArtistModel, { Artist } from "@/models/ArtistModel";
import LyricsModel, { Lyrics } from "@/models/LyricsModel";
import UserModel from "@/models/UserModel";
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

    // Add the new song to the artist's songs array and album's tracks array using Promise.all

    const artistUpdate = await ArtistModel.findByIdAndUpdate(
      singerDetails._id,
      {
        $push: { songs: newSongCreated._id },
      },
      { new: true } // This ensures you get the updated artist details
    );
    artistUpdate ? console.log("artistupdated") : null;

    const albumUpdate = await AlbumModel.findByIdAndUpdate(
      albumId,
      {
        $push: { tracks: newSongCreated._id },
      },
      { new: true } // This ensures you get the updated album
    );

    albumUpdate ? console.log("albumUpdated") : null;

    const userUpdate = await UserModel.findByIdAndUpdate(
      currentUserId,
      {
        $push: { contributedLyrics: newSongCreated._id },
      },
      { new: true }
    );
    userUpdate ? console.log("UserUpdated") : null;

    if (!artistUpdate || !albumUpdate || !userUpdate) {
      LyricsModel.findByIdAndDelete(newSongCreated._id);
      throw new Error(
        "Error updating the artistUpdate or album Update with the newSongID. The created Song has been deleted."
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "Lyrics creation successful",
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
