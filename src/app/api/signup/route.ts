import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/UserModel";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  await dbConnect();

  try {
    const { username, email, password } = await req.json();

    const isUserExists = await UserModel.findOne({
      $or: [{ username }, { email }],
    });

    if (isUserExists) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "User with this username/email already exists",
        }),
        { status: 400 }
      );
    }

    // Hash the password and create a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });

    if (!newUser) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Failed to create user",
        }),
        { status: 400 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "User created successfully",
        data: newUser,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Error registering user",
      }),
      { status: 500 }
    );
  }
}
