import dbConnect from "@/lib/dbConnect";
import ArtistModel from "@/models/ArtistModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const {
      name,
      bio,
      genre,
      artistProfileImage, // Ensure this matches the field in the model
      debutDate,
    } = await req.json();

    console.log(name, bio, genre, artistProfileImage, debutDate);

    // const ifSameNameExists = await ArtistModel.findOne({ name: name });
    // console.log(ifSameNameExists);
    // if (ifSameNameExists) {
    //   return NextResponse.json(
    //     {
    //       message: "Artist with the same name already exists",
    //       success: false,
    //     },
    //     { status: 400 }
    //   );
    // }
    // Create the artist

    const createdArtist = await ArtistModel.create({
      name: name,
      bio: bio,
      genre: genre,
      artistProfileImage: artistProfileImage,
      debutDate: debutDate,
    });

    console.log(createdArtist);

    return new Response(
      JSON.stringify({
        message: "Create Artist API working fine",
        result: createdArtist,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error creating artist:", error);
    return new Response(
      JSON.stringify({
        message: "Error creating artist",
        error: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
