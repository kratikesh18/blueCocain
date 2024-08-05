"use server";
import { uploadFileToCloud } from "@/lib/Cloudinary";
import UserModel from "@/models/UserModel";
import { getServerSession, User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as Blob;
  const session = await getServerSession(authOptions);
  const _user: User = session?.user as User;

  if (!session || !_user) {
    return Response.json(
      { success: false, message: "Not authenticated" },
      { status: 401 }
    );
  }

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  // Convert Blob to Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const mimetype = file.type;

  try {
    const response = await uploadFileToCloud(buffer, mimetype);

    if (!response) {
      return NextResponse.json(
        { error: "Failed to upload file to Cloudinary" },
        { status: 500 }
      );
    }

    //now setting the image to the db
    const updateduUser = await UserModel.updateOne(
      { _id: _user._id },
      { $set: { profileImage: response.url } }
    );
    if (!updateduUser) {
      return NextResponse.json(
        { error: "Failed to update user profile image" },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { message: "File uploaded successfully", fileUrl: response.url },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    return NextResponse.json(
      { error: "Failed to upload file to Cloudinary" },
      { status: 500 }
    );
  }
}
