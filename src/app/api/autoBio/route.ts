"use server";
import { generateArtistBio } from "@/helpers/generateArtistsBio";
import dbConnect from "@/lib/dbConnect";
import ArtistModel from "@/models/ArtistModel";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    console.log("printing searchParams", searchParams);
    const name = searchParams.get("name");

    if (!name) {
      return Response.json(
        { success: false, message: "NO Name found " },
        { status: 404 }
      );
    }
    // Generate artist bio
    const bio = JSON.parse(await generateArtistBio(name));

    // Create new artist profile
    console.log("printing the bio ", bio);
    return Response.json(
      {
        success: true,
        message: "Bio generated successfully",
        bio: bio.bio,
        result: bio,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating artist profile:", error);
    return Response.json(
      {
        success: false,
        message: "Failed to create artist profile",
      },
      { status: 404 }
    );
  }
}
