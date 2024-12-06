"use server";
import dbConnect from "@/lib/dbConnect";
import AlbumModel from "@/models/AlbumModel";
import ArtistModel from "@/models/ArtistModel";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  await dbConnect();

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { albumArtUrl, albumName, genre, singerName, releaseDate } =
      await req.json();

    // Validate input
    if (!albumArtUrl || !albumName || !genre || !singerName || !releaseDate) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if album exists
    const existingAlbum = await AlbumModel.findOne({ albumName, releaseDate });
    if (existingAlbum) {
      return NextResponse.json(
        { success: false, message: "Album already exists with the same name and release date" },
        { status: 400 }
      );
    }

    // Find the artist
    const findingArtist = await ArtistModel.findOne({ name: singerName });
    if (!findingArtist) {
      return NextResponse.json(
        { success: false, message: "Artist not found" },
        { status: 404 }
      );
    }

    // Create the new album
    const newAlbum = await AlbumModel.create(
      [
        {
          albumName,
          albumArt: albumArtUrl,
          releaseDate,
          by: findingArtist._id,
          genre,
        },
      ],
      { session }
    );

    // Update artist with the new album ID
    const updatedSinger = await ArtistModel.findByIdAndUpdate(
      findingArtist._id,
      { $push: { albums: newAlbum[0]._id } },
      { new: true, session }
    );

    if (!updatedSinger) {
      throw new Error(
        "Error updating the artist with the new album ID. Rolling back transaction."
      );
    }

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    return NextResponse.json({
      success: true,
      message: "Album created successfully",
      result: newAlbum[0]._id,
    });
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error occurred:", error.message);
    return NextResponse.json(
      { success: false, message: `Error occurred: ${error.message}` },
      { status: 500 }
    );
  }
}



// "use server";

// import dbConnect from "@/lib/dbConnect";
// import AlbumModel from "@/models/AlbumModel";
// import ArtistModel from "@/models/ArtistModel";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   await dbConnect();

//   try {
//     const { albumArtUrl, albumName, genre, singerName, releaseDate } =
//       await req.json();

//     console.log(albumArtUrl, albumName, genre, singerName, releaseDate);

//     // if we need to store the data to the database then we must have to update some values of the other database

//     /*
//     1. we have to gather all the data 
//     2. we have to check if the album already exists or not
//     3. if not then we have to create a new album
//     4. if album already exists then we have to return an error
//     */

//     //all data is gathered
//     if (
//       [albumArtUrl, albumName, genre, singerName, releaseDate].some(
//         (field) => field.trim() === ""
//       )
//     ) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "All fields are required",
//         },
//         { status: 400 }
//       );
//     }

//     // checking whether if the data of the singer and album matches
//     const isAlbumExists = await AlbumModel.findOne({
//       albumName,
//     });

//     if (isAlbumExists) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Album with same name already exists",
//         },
//         { status: 400 }
//       );
//     }

//     //finding the artist
//     const artistInfo = await ArtistModel.findOne({
//       name: singerName,
//     });

//     if (!artistInfo) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Artist not found to update",
//         },
//         { status: 404 }
//       );
//     }

 
//     const createdAlbum = await AlbumModel.create({
//       albumName,
//       albumArt: albumArtUrl,
//       // by: artistInfo._id,
//       // releaseDate: new Date(releaseDate),
//       // tracks: [],
//       // genre,
//     });


//     if (!createdAlbum) {
//       return NextResponse.json({
//         success: false,
//         message: "Failed to create album mongoose error",
//       });
//     }
//     console.log("Printing Created Album ", createdAlbum);

//     // if the code reaches here we have to create a new album and update the some other databases

//     return NextResponse.json(
//       {
//         success: true,
//         message: "Album Created Successfully",
//         result: createdAlbum
//       },
//       { status: 200 }
//     );
//   } catch (error: any) {
//     return NextResponse.json(
//       {
//         success: false,
//         message: `Failed to Create Album ${error.message}`,
//       },
//       { status: 500 }
//     );
//   }
// }

