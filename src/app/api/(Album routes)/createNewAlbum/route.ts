"use server";
import dbConnect from "@/lib/dbConnect";
import AlbumModel from "@/models/AlbumModel";
import ArtistModel from "@/models/ArtistModel";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  await dbConnect();
  const { albumArtUrl, albumName, genre, singerName, releaseDate } =
    await req.json();

  // console.log(albumArtUrl, albumName, genre, singerName, releaseDate);

  //finding the sanme named album already exists or not
  const existingAlbum = await AlbumModel.find({ albumName, releaseDate });
  if (existingAlbum.length > 0) {
    return Response.json(
      {
        success: false,
        message: "Album already exist with the same name",
      },
      { status: 400 }
    );
  }
  // finding the id of the artist
  const findingArtist = await ArtistModel.findOne({ name: singerName });

  const newAlbum = await AlbumModel.create({
    albumName,
    albumArt: albumArtUrl,
    releaseDate,
    by: findingArtist._id,
    genre,
  });

  if (newAlbum) {
    console.log("Album Created successfully ", newAlbum);
  }

  return Response.json({
    success: true,
    message: "Album Created Successfully",
    result: newAlbum._id,
  });
}
