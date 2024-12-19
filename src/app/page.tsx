"use client";
import { Searchbar } from "@/components/Searchbar";
import ExploreSections from "@/components/HomepageComponents/ExploreSections";

const HomePage = () => {
  return (
    <main className="min-h-screen bg-black">
      <Searchbar />
      <ExploreSections />
    </main>
  );
};

export default HomePage;

