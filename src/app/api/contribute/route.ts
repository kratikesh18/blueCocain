"use server";
import dbConnect from "@/lib/dbConnect";
import LyricsModel from "@/models/LyricsModel";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);
    const songId = searchParams.get("for");
    console.log("pringing the songid from the contribute page", songId);
    // const { newLyricsArray: newLyricsArryOfObject } = await req.json();
    const { updatedLyrics: newLyricsArryOfObject } = await req.json();

    // console.log(someting);
    console.log("printing in the api ", newLyricsArryOfObject);
    // const newLyricsArryOfObject = [
    //   { line: "You should take it as a compliment", startTime: 0, endTime: 5 },
    //   {
    //     line: "That I got drunk and made fun of the way you talk",
    //     startTime: 6,
    //     endTime: 10,
    //   },
    // ];

    //finding the lyrics based on the provided songid
    const lyricsObjectIfPresent = await LyricsModel.findById(songId);

    if (!lyricsObjectIfPresent) {
      return Response.json(
        {
          success: false,
          message: "Object not found in db",
        },
        { status: 404 }
      );
    }

    lyricsObjectIfPresent.lyricsText = newLyricsArryOfObject;
    const newUpdatedLyricsform = await lyricsObjectIfPresent.save();
    // console.log("printing the new lyricsupdated ", newUpdatedLyricsform);

    console.log("printing the updated object", lyricsObjectIfPresent);
    return Response.json(
      {
        success: true,
        message: "IM woking fine",
        updatedLyrics: newUpdatedLyricsform,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: `Object not found in db throwing error: ${error}  `,
      },
      { status: 404 }
    );
  }
}
