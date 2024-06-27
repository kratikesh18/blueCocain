import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="text-2xl font-bold text-center bg-black text-white py-2 ">
      <Link href={"/"} className="tracking-wider">Lyric!fy</Link>
    </nav>
  );
};

export default Navbar;
