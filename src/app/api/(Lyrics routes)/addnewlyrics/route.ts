"use server";
import dbConnect from "@/lib/dbConnect";
import AlbumModel, { Album } from "@/models/AlbumModel";
import ArtistModel, { Artist } from "@/models/ArtistModel";
import LyricsModel, { Lyrics } from "@/models/LyricsModel";
import AlbumModel1 from "@/models/NewAlbumModel";

import UserModel from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { data: songDetails, currentUserEmail, albumId } = await req.json();
    const { songName, albumName, genre, singerName, releaseDate } = songDetails;

    console.log(songDetails, currentUserEmail);
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

    const singerDetails = await ArtistModel.findOne({ name: singerName });

    const albumDetails = await AlbumModel1.findById(albumId);

    const userDetails = await UserModel.findOne({
      email: currentUserEmail,
    });

    // console.log(
    //   "Printing Singer",
    //   singerDetails,
    //   "Printing Album Details ",
    //   albumDetails
    // );

    // if (!singerDetails) {
    //   return NextResponse.json(
    //     { success: false, message: "Artist not found" },
    //     { status: 404 }
    //   );
    // }

    // if (!albumDetails) {
    //   return NextResponse.json(
    //     { success: false, message: "Album not found" },
    //     { status: 404 }
    //   );
    // }

    // if (!userDetails) {
    //   return NextResponse.json(
    //     { success: false, message: "User not found" },
    //     { status: 404 }
    //   );
    // }

    // // Create the new song/lyrics entry
    const newSongCreated: Lyrics = await LyricsModel.create({
      songName,
      singer: singerDetails._id,
      albumName,
      genre,
      releaseDate,
      albumDetails: albumId,
      contributedBy: userDetails?._id,
    });
    // console.log("\nprinting New song created ", newSongCreated);

    if (!newSongCreated) {
      throw Error("Failed To Create New Song");
    }

    //updating the singer with this song
    const updatedArtist = await ArtistModel.findByIdAndUpdate(
      singerDetails._id,
      {
        $push: { songs: newSongCreated._id, albums: albumId },
      },
      { new: true }
    );

    //updating the album
    const updatedAlbum = await AlbumModel1.findByIdAndUpdate(albumId, {
      $push: { tracks: newSongCreated._id, by: singerDetails._id },
    });

    //artist and album is updated

    // if (!newSongCreated) {
    //   throw new Error("Failed to create lyrics");
    // }
    // console.log(newSongCreated);

    // // Update the artist, album, and user with the new song ID
    // const [artistUpdate, albumUpdate, userUpdate] = await Promise.all([
    //   ArtistModel.findByIdAndUpdate(
    //     singerDetails._id,
    //     { $push: { songs: newSongCreated._id } },
    //     { new: true }
    //   ).exec(),
    //   AlbumModel.findByIdAndUpdate(
    //     albumId,
    //     { $push: { tracks: newSongCreated._id } },
    //     { new: true }
    //   ).exec(),
    //   UserModel.findByIdAndUpdate(
    //     userDetails._id,
    //     { $push: { contributedLyrics: newSongCreated._id } },
    //     { new: true }
    //   ).exec(),
    // ])
    //   .then(() => {
    //     console.log("All documents are updated successfully");
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //   });

    if (!updatedAlbum || !updatedArtist) {
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
