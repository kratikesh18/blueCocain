import dbConnect from "@/lib/dbConnect";
import AlbumModel, { Album } from "@/models/AlbumModel";
import ArtistModel from "@/models/ArtistModel";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const { data, artistDetails } = await req.json();

    const { albumArtUrl, albumName, genre, singerName, releaseDate } = data;
    const { _id: singerId } = artistDetails[0];

    if (
      [albumArtUrl, albumName, genre, singerName, releaseDate].some(
        (field) => field.trim() == ""
      )
    ) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    //checking if the album already exists
    const albumExists = await AlbumModel.findOne({ albumName });
    if (albumExists) {
      return NextResponse.json(
        { success: false, message: "Album already exists" },
        { status: 400 }
      );
    }

    //finding the artist to store its id

    const newAlbum: Promise<Album> = await AlbumModel.create({
      albumArt: albumArtUrl,
      albumName,
      genre,
      by: singerId,
      releaseDate,
    });

    if (!newAlbum) {
      throw Error("Album Not Create");
    }
    //album is created 
    //now we have to assign it to the singer 
    await ArtistModel.findByIdAndUpdate(singerId,{
      $push:{}
    })
    return NextResponse.json(
      {
        success: true,
        message: "All fields are recieved",
        result: (await newAlbum)._id,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return (
      NextResponse.json({
        success: false,
        message: `Something went wrong : ${error.message}`,
      }),
      { status: 500 }
    );
  }
}
