import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return NextResponse.json(
    { success: true, message: "Api working fine" },
    { status: 200 }
  );
}
