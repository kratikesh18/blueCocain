"use server";
import useSingerDetails from "@/hooks/useSingerDetails";
import dbConnect from "@/lib/dbConnect";
import AlbumModel, { Album } from "@/models/AlbumModel";
import ArtistModel, { Artist } from "@/models/ArtistModel";
import LyricsModel, { Lyrics } from "@/models/LyricsModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // so the flow of the code
  /*
  1.take all the inputs like name of songname ,singername, albumname, genre, albumArtUrl & releasedate, with currentUserId and albumId
  2.finding the artistDetails its ID mostly
  3.
  */
  try {
    await dbConnect();

    const { data: songDetails, currentUserId, albumId } = await req.json();
    if (!songDetails) {
      return NextResponse.json(
        {
          success: false,
          message: "Song details not found",
        },
        { status: 404 }
      );
    }

    const { albumArtUrl, albumName, songName, genre, singerName, releaseDate } =
      songDetails;

    console.log(albumArtUrl, albumName, songName, singerName, releaseDate);

    // Find the artist by name
    let artistDetailsByName: Artist | null = await ArtistModel.findOne({
      name: singerName,
    });

    if (!artistDetailsByName) {
      return NextResponse.json(
        {
          success: false,
          message: "Artist not found",
        },
        { status: 404 }
      );
    }

    // Add the song to the Lyrics collection
    const newSong: Lyrics = await LyricsModel.create({
      albumName,
      songName,
      genre,
      singer: artistDetailsByName._id,
      releaseDate,
      contributedBy: currentUserId,
      albumDetails: albumId,
    });
    console.log(newSong);

    console.log("printing NewSong id", newSong._id);
    // Add the song to the artist's song list

    artistDetailsByName.songs.push(newSong._id as mongoose.Types.ObjectId);
    await artistDetailsByName.save();

    // Check if the album already exists
    let existingAlbum:Album |null = await AlbumModel.findOne({ albumName });

    if (existingAlbum) {
      // Add the song to the existing album
      console.log("printing the objectID in existing Album", newSong.id)
      existingAlbum.tracks.push(newSong._id as mongoose.Schema.Types.ObjectId)
      await existingAlbum.save();
    } else {
      // Create a new album and add the song to it
      const newAlbum = await AlbumModel.create({
        albumName,
        by: artistDetailsByName._id,
        releaseDate,
        genre,
        albumArt: albumArtUrl,
        tracks: [newSong._id],
      });

      if (!newAlbum) {
        return NextResponse.json(
          {
            success: false,
            message: "Failed to create new album",
          },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Lyrics added successfully",
        result: newSong,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
