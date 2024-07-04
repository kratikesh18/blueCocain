"use client";
import SearchTile, { SearchResultType } from "@/components/SearchTile";
import { Searchbar } from "@/components/Searchbar";
import Switch from "@/components/Switch";
import TheLyrics from "@/components/TheLyrics";
import { Button } from "@/components/ui/button";
import { LyricsContext } from "@/context/LyricsContext";
import seedData from "@/helpers/seedData";
import axios from "axios";
// import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const HomePage = () => {
  // const { data: session } = useSession();
  const [showSearch, setShowSearch] = useState<boolean>(true);
  const router = useRouter();
  const [allItems, setAllItems] = useState<SearchResultType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getAllLyrics() {
      setLoading(true);
      try {
        const response = await axios.get(`/api/allLyrics`);
        if (!response) {
          throw new Error("failed to fetch All Lyrics");
        }
        setAllItems(response.data.result);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getAllLyrics();
  }, []);
  return (
    <div className=" ">
      {/* <Switch showSearch={showSearch} setShowSearch={setShowSearch} /> */}
      {/* {!showSearch && <TheLyrics />} */}
      {showSearch && <Searchbar />}

      {/* <Button onClick={() => seedData()}>Seed data now</Button> */}
      <div className="">
        {loading ? (
          <div className="h-full w-full flex justify-center items-center mt-8">
            <div className="loader "></div>
          </div>
        ) : (
          <div>
            <div className="flex flex-col gap-4 p-7 overflow-auto ">
              {allItems && (
                <h1 className="text-xl font-bold">
                  Exlpore our newest additions
                </h1>
              )}

              {allItems &&
                allItems.map((item) => (
                  <SearchTile item={item} key={item._id} />
                ))}
            </div>
          </div>
        )}
      </div>
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
