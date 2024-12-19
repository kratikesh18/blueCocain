import dbConnect from "@/lib/dbConnect";
import ArtistModel from "@/models/ArtistModel";
import { NextApiRequest } from "next";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  // console.log(searchParams);
  const artistNameToSearch = searchParams.get("artistname");
  // console.log(artistNameToSearch);
  try {
    const ArtistNamesArray = await ArtistModel.find({
      name: artistNameToSearch,
    }).select(
      "-bio -genre -debutDate -songs -albums -artistProfileImage -keywords -__v -createdAt -updatedAt"
    );

    if (ArtistNamesArray.length === 0) {
      return Response.json(
        {
          success: false,
          message: "Artist not found",
        },
        { status: 404 }
      );
    }
    return Response.json(
      {
        success: true,
        result: ArtistNamesArray,
        message: "Artist found",
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "ARtist not found",
      },
      { status: 404 }
    );
  }
}
