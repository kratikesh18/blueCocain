import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import LogoutIcon from "../icons/LogoutIcon";
import UserIcon from "../icons/UserIcon";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { HomeIcon } from "@radix-ui/react-icons";

export function PopOverNav({ session }: { session: Session }) {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <div className="w-fit flex flex-col justify-center items-center gap-4">
      {pathname === "/profile" ? (
        <Link href={"/"} className="flex justify-center items-center gap-2">
          <span>Home</span>
          <HomeIcon />
        </Link>
      ) : (
        <Link href={"/profile"} className="flex justify-center items-center gap-1">
          <span>Profile</span>
          <UserIcon  />
        </Link>
      )}
      <Button className="" onClick={() => signOut()}>
        <span className="mr-1">Logout</span>
        <LogoutIcon />
      </Button>
    </div>
  );
}
