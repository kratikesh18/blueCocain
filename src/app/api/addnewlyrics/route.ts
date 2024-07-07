import dbConnect from "@/lib/dbConnect";
import ArtistModel from "@/models/ArtistModel";
import LyricsModel from "@/models/LyricsModel";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  await dbConnect();
  const { data: songDetails } = await req.json();

  if (!songDetails) {
    return Response.json(
      {
        success: false,
        message: "Song details not found",
      },
      { status: 404 }
    );
  }
  const { albumArt, albumName, songName, genre, singerName, releaseDate } =
    songDetails;

  // finding the _id from the Artistname
  const ArtistDetailsByName = await ArtistModel.findOne({ name: singerName });

  const addedInfoToDB = await LyricsModel.create({
    albumArt,
    albumName,
    songName,
    genre,
    singer: ArtistDetailsByName._id,
    releaseDate,
  });

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
  // console.log(songDetails);
  return Response.json(
    {
      success: true,
      message: "API is woking fine",
    },
    { status: 200 }
  );
}
