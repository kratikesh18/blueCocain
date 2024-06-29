"use client";
import { Searchbar } from "@/components/Searchbar";
import Switch from "@/components/Switch";
import TheLyrics from "@/components/TheLyrics";
import { Button } from "@/components/ui/button";
import { LyricsContext } from "@/context/LyricsContext";
import seedData from "@/helpers/seedData";
// import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const HomePage = () => {
  // const { data: session } = useSession();
  const [showSearch, setShowSearch] = useState<boolean>(true);
  const router = useRouter();
  
  return (
    <div className="h-screen ">
      <Switch showSearch={showSearch} setShowSearch={setShowSearch} />
      {!showSearch && <TheLyrics />}
      {showSearch && <Searchbar />}

      {/* <Button onClick={() => seedData()}>Seed data now</Button> */}
    </div>
  );
};

export default HomePage;

{
  /* <h1>Spotify Lyrics Search</h1> */
}
{
  /* {!session ? (
    <button onClick={() => signIn("spotify")}>Sign in with Spotify</button>
    ) : (
      <button onClick={() => signOut()}>Sign out</button>
      )}
      {session && ( */
}
{
  /* <Switch />; */
}
{
  /* )} */
}

// const seedDataAf = async () => {
//
// };
