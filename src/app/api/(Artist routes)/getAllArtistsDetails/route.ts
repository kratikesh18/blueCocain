"use server";
import dbConnect from "@/lib/dbConnect";
import ArtistModel from "@/models/ArtistModel";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  await dbConnect();
  const allArtistsToSend = await ArtistModel.find().select(
    "-keywords -__v -updatedAt -createdAt"
  );

  return Response.json(
    { message: "All Artists Fetched Sucessfully", result: allArtistsToSend },
    { status: 200 }
  );
}
