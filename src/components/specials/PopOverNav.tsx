import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import LogoutIcon from "../icons/LogoutIcon";
import UserIcon from "../icons/UserIcon";
import { usePathname } from "next/navigation";
import Link from "next/link";
import HomeIcon from "../icons/HomeIcon";

export function PopOverNav({ session }: { session: Session }) {
  const pathname = usePathname();
  // console.log(pathname);
  return (
    <div className="w-fit flex font-semibold flex-col justify-center items-center gap-4">
      {pathname === "/profile" ? (
        <Link href={"/"} className="flex justify-center items-center gap-1">
          <p>Home</p>
          <HomeIcon />
        </Link>
      ) : (
        <Link
          href={"/profile"}
          className="flex justify-center items-center gap-1"
        >
          <p>Profile</p>
          <UserIcon />
        </Link>
      )}
      <button
        className="flex justify-center items-center gap-1"
        onClick={() => signOut()}
      >
        <p>Logout</p>
        <LogoutIcon />
      </button>
    </div>
  );
}
