"use server";
import dbConnect from "@/lib/dbConnect";
import AlbumModel from "@/models/AlbumModel";
import ArtistModel, { Artist } from "@/models/ArtistModel";
import LyricsModel from "@/models/LyricsModel";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  await dbConnect();
  const { data: songDetails } = await req.json();
  console.log("printing the songDetails", songDetails);
  if (!songDetails) {
    return Response.json(
      {
        success: false,
        message: "Song details not found",
      },
      { status: 404 }
    );
  }
  const { albumArtUrl, albumName, songName, genre, singerName, releaseDate } =
    songDetails;

  // finding the _id from the Artistname
  const ArtistDetailsByName: Artist | null = await ArtistModel.findOne({
    name: singerName,
  });

  //adding the song to the album
  if (ArtistDetailsByName) {
    const addedInfoToDB = await LyricsModel.create({
      albumName,
      songName,
      genre,
      singer: ArtistDetailsByName._id,
      releaseDate,
    });

    ArtistDetailsByName.songs.push(addedInfoToDB._id);
    await ArtistDetailsByName.save();

    const AlbumAlreadyExists = await AlbumModel.findOne({
      albumName: albumName,
    });

    if (AlbumAlreadyExists) {
      AlbumAlreadyExists.tracks.push(addedInfoToDB._id);
      await AlbumAlreadyExists.save();
    }

    if (!AlbumAlreadyExists) {
      // create a new album
      const newAlbum = await AlbumModel.create({
        albumName: albumName,
        by: ArtistDetailsByName._id,
        releaseDate: releaseDate,
        genre,
        albumArt: albumArtUrl,
        tracks: addedInfoToDB._id,
      });
      if (!newAlbum) {
        console.log("Error while creating the Album for the song");
      }
    }

    if (addedInfoToDB) {
      // console.log(addedInfoToDB);
      return Response.json(
        {
          suscess: true,
          message: "Lyrics added sucessfully",
          result: addedInfoToDB,
        },
        { status: 200 }
      );
    }
  }
  // console.log(songDetails);
  return Response.json(
    {
      success: true,
      message: "API is woking fine",
    },
    { status: 200 }
  );
}
