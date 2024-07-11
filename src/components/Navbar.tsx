"use client";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import SearchIcon from "./icons/SearchIcon";
import AddIcon from "./icons/AddIcon";
import UserIcon from "./icons/UserIcon";
import { PopOverNav } from "./specials/PopOverNav";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import SearchPopOverNav from "./specials/SearchPopOverNav";

// SVG Icon Components

const Navbar = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  return (
    <nav className=" bg-black text-white py-3 px-4 shadow-lg  ">
      <div className="container mx-auto flex justify-between items-center ">
        <div className="flex items-center gap-4">
          <Link
            href="/addLyrics"
            className="hover:opacity-75 transition-opacity"
          >
            <AddIcon />
          </Link>
        </div>

        <div className="text-2xl font-bold tracking-wider">
          <Link href="/" className="hover:text-gray-300 transition-colors">
            <h1 className="bg-gradient-to-b from-gray-200 via-white to-gray-600 text-transparent bg-clip-text text-2xl">
              blueCocain
            </h1>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {/* A searchbar not  */}
          {pathname !== "/" && (
            <Popover>
              <PopoverTrigger>
                <div className="hover:opacity-75 transition-opacity">
                  <SearchIcon />
                </div>
              </PopoverTrigger>
              <PopoverContent className="mt-4 w-fit border-2 border-gray-400 bg-black text-white">
                <SearchPopOverNav />
              </PopoverContent>
            </Popover>
          )}

          {status === "loading" ? (
            <div className="loader"></div>
          ) : session ? (
            <Popover>
              <PopoverTrigger>
                <div className="hover:opacity-75 transition-opacity">
                  <UserIcon />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-fit border-2 border-gray-400 mt-4 bg-black text-gray-200">
                <PopOverNav session={session} />
              </PopoverContent>
            </Popover>
          ) : (
            <div className="flex gap-2 text-base">
              <Link href="/login" className="hover:underline transition-colors">
                Login
              </Link>
              <Link
                href="/signup"
                className="hover:underline transition-colors"
              >
                SignUp
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
