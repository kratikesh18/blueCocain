import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import LogoutIcon from "../icons/LogoutIcon";

export function PopOverNav({ session }: { session: Session }) {
  return (
    <div className="w-fit flex flex-col justify-center items-center gap-4">
      <h1 className="text-base font-semibold">Hey, {session.user.username}</h1>
      <Button className="" onClick={() => signOut()}>
        <span className="mr-1">Logout</span>
        <LogoutIcon />
      </Button>
    </div>
  );
}
