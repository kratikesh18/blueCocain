import dbConnect from "@/lib/dbConnect";
import { NextRequest } from "next/server";

export async function GET(req:NextRequest){
    await dbConnect();
    try {
        
    } catch (error) {
        
    }
}