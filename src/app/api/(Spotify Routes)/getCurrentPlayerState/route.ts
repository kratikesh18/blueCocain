"use server"

import axios from "axios";
import { NextRequest } from "next/server";

export async function GET(req:NextRequest){
  const headers = new Headers(req.headers);
  const session = headers.get("Authorization");


  const response = await axios.get(`https://api.spotify.com/v1/me/player/currently-playing`, {headers:{Authorization:session}});

  console.log(response)

  return Response.json({message:"Hello fro the server!"}, {status:200})
}