"use client";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import SearchIcon from "./icons/SearchIcon";
import AddIcon from "./icons/AddIcon";
import UserIcon from "./icons/UserIcon";

// SVG Icon Components

const Navbar = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav>
      <div className="flex justify-around items-center w-full text-2xl font-bold text-center bg-black text-white py-3 px-2">
        <div>
          <Link href="/addLyrics">
            <AddIcon />
          </Link>
        </div>

        <div>
          <Link href="/" className="tracking-wider">
            {/* Lyr!csF<span className="text-sm">or</span>Y
            <span className="text-sm">ou</span> */}
            blueCocain
          </Link>
        </div>

        <div className="flex justify-center items-center gap-4">
          {pathname !== "/" && (
            <div>
              <SearchIcon />
            </div>
          )}
          {status === "loading" ? (
            <div>Loading...</div>
          ) : session ? (
            <div>
              <UserIcon />
            </div>
          ) : (
            <div className="flex justify-center items-center gap-2 text-base">
              <Link
                href="/login"
                className="rounded-md flex justify-center items-center gap-1 hover:underline"
              >
                <span>Login</span>
              </Link>
              <Link
                href="/signup"
                className="rounded-md flex justify-center items-center gap-1 hover:underline"
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
