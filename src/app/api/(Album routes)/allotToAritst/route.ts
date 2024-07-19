"use server";
import dbConnect from "@/lib/dbConnect";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  await dbConnect();
  const { AlloatedAritstId } = await req.json();
  console.log(AlloatedAritstId);
  return Response.json(
    { success: true, message: "Api Working fine" },
    { status: 200 }
  );
}
