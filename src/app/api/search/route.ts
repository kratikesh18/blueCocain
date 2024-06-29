"use server";
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { query, accessToken } = req.query;

  if (!query || !accessToken) {
    return res
      .status(400)
      .json({ error: "Query and access token are required" });
  }

  try {
    const response = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        q: query,
        type: "track",
        limit: 10,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to search for tracks." });
  }
}
