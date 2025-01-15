"use client";
import { Searchbar } from "@/components/Searchbar";
import ExploreSections from "@/components/HomepageComponents/ExploreSections";

const HomePage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-950 to-black">
      <Searchbar />
      <ExploreSections />
    </main>
  );
};

export default HomePage;
