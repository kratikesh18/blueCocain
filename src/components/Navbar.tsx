"use client";
import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import SearchIcon from "./icons/SearchIcon";
import AddIcon from "./icons/AddIcon";
import UserIcon from "./icons/UserIcon";
import { PopOverNav } from "./specials/PopOverNav";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import SearchPopOverNav from "./specials/SearchPopOverNav";
import LibraryIcon from "./icons/LibraryIcon";

const Navbar = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  return (
    <nav className="bg-black text-white py-3 px-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
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
            <h1 className="theme-text-style text-2xl">
              blueCocain
            </h1>
          </Link>
        </div>


        <div className="flex items-center gap-4">
          {pathname !== "/" && (
            <Popover>
              <PopoverTrigger>
                <div className="hover:opacity-75 transition-opacity">
                  <SearchIcon />
                </div>
              </PopoverTrigger>
              <PopoverContent className="mt-4 mr-4 w-fit bg-transparent backdrop-blur-3xl border-gray-400  text-white">
                <SearchPopOverNav />
              </PopoverContent>
            </Popover>
          )}

          {status === "loading" ? (
            <div>
              <h1 className="text-white">Loading...</h1>
            </div>
          ) : session ? (
            <div className="flex justify-center items-center gap-4">
              {pathname !== "/Library" && (
                <Link href="/Library">
                  <LibraryIcon />
                </Link>
              )}
              <Popover>
                <PopoverTrigger>
                  <div className="hover:opacity-75 transition-opacity">
                    <UserIcon />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="mr-4 w-fit  mt-4 bg-transparent backdrop-blur-3xl text-gray-200">
                  <PopOverNav session={session} />
                </PopoverContent>
              </Popover>
            </div>
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
