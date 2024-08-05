import { getServerSession, User } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import UserModel from "@/models/UserModel";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const _user: User = session?.user as User;

  if (!session || !_user) {
    return Response.json(
      { success: false, message: "Not authenticated" },
      { status: 401 }
    );
  }

  const userProfileImage = await UserModel.findById(_user._id).select(
    "profileImage -_id"
  );

  return Response.json(
    {
      success: true,
      url: userProfileImage,
      message: "profileImage fetched successully",
    },
    { status: 200 }
  );
}
