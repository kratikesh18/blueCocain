"use client";
import Link from "next/link";
import React from "react";
import NewLyrics from "./NewLyrics";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav>
      <div className="flex justify-around items-center w-full text-2xl font-bold text-center bg-black text-white py-2 px-2">
        <div className="">
          <Link href={"/addLyrics"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3.0}
              stroke="currentColor"
              className="size-6 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </Link>
        </div>

        <div>
          <Link href={"/"} className="tracking-wider">
            Lyr!csF<span className="text-sm">or</span>Y
            <span className="text-sm">ou</span>
          </Link>
        </div>

        <div className=" flex justify-center items-center gap-2 text-base">
          <Link
            href={`/login`}
            className="  rounded-md flex justify-center items-center gap-1 hover:underline  "
          >
            <span className="">Login</span>
          </Link>
          <Link
            href={"/signup"}
            className="   rounded-md flex justify-center items-center gap-1 hover:underline"
          >
            SignUp
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
