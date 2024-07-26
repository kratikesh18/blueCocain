import dbConnect from "@/lib/dbConnect";
import ArtistModel from "@/models/ArtistModel";
import { NextRequest } from "next/server";

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
    if (
      [name, bio, genre, artistProfileImage, debutDate].some(
        (field) => field?.trim() === ""
      )
    ) {
      return Response.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 404 }
      );
    }
    console.log(name, bio, genre, artistProfileImage, debutDate);

    const ifSameNameExists = await ArtistModel.findOne({ name: name });
    console.log(ifSameNameExists);

    if (ifSameNameExists) {
      return Response.json(
        {
          message: "Artist with the same name already exists",
          success: false,
        },
        { status: 400 }
      );
    }

    // Create the artist
    const createdArtist = await ArtistModel.create({
      name: name,
      bio: bio,
      genre: genre,
      artistProfileImage: artistProfileImage,
      debutDate: debutDate,
    });

    console.log(createdArtist);

    return Response.json(
      {
        message: "Create Artist API working fine",
        result: createdArtist,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error creating artist:", error);
    return Response.json(
      {
        message: "Error creating artist",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
