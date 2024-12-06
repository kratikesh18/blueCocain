import { NextAuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import clientPromise from "./mongoConfig";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { Adapter } from "next-auth/adapters";

 async function refreshAccessToken(token: any) {
  console.log("Refreshing AccessToken mf");
  try {
    const url =
      "https://accounts.spotify.com/api/token?" +
      new URLSearchParams({
        client_id: process.env.SPOTIFY_CLIENT_ID!,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET!,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      });

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000, // Spotify tokens expire in 1 hour
      refreshToken: refreshedTokens.refresh_token || token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.error("Error refreshing access token:", error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "user-read-private",
  "user-read-email",
].join(" ");

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope: scopes,
        },
      },
    }),
  ],

  adapter: MongoDBAdapter(clientPromise) as Adapter,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, account }) {
      // Persist the access token to the token object
      if (account) {
        const { access_token, expires_at, refresh_token } = account;
        console.log("printing the Account", account);
        token.accessToken = access_token;
        token.refreshToken = refresh_token;
        token.expiresAt = Date.now() + expires_at! * 1000;
      }

      if (token.expiresAt && Date.now() < token.expiresAt) {
        return token;
      }
      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      // Make the access token available in the session
      console.log("in the seession");
      session.accessToken = token.accessToken as string;
      // console.log("printing the session", session.accessToken)

      return session;
    },
  },
};
