"use client";
import ExploreSections from "@/components/HomepageComponents/ExploreSections";

const HomePage = () => {
  return (
    <main className=" min-h-screen p-4 flex flex-col gap-4">
      <ExploreSections />
      <footer className="text-center">&copy; Copyright 2025 blueCocain - All rights reserved.</footer>
    </main>
  );
};

export default HomePage;
