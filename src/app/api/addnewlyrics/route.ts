import dbConnect from "@/lib/dbConnect";
import LyricsModel from "@/models/LyricsModel";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  await dbConnect();
  const { songDetails } = await req.json();
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

  console.log(
    "printing the data from the songdeatils destructure ",
    albumArt,
    albumName,
    songName,
    genre,
    singerName,
    releaseDate
  );
  const addedInfoToDB = await LyricsModel.create({
    albumArt,
    albumName,
    songName,
    genre,
    singer: singerName._id,
    releaseDate,
  });
  if (addedInfoToDB) {
    console.log(addedInfoToDB);
    return Response.json(
      {
        suscess: true,
        message: "Lyrics added sucessfully",
        result: addedInfoToDB,
      },
      { status: 200 }
    );
  }
  console.log(songDetails);
  return Response.json(
    {
      success: true,
      message: "API is woking fine",
    },
    { status: 200 }
  );
}
