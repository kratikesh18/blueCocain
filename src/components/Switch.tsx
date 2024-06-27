import React, { useState } from "react";
import { Button } from "./ui/button";

interface SwitchPropType {
  showSearch: boolean;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
}
const Switch: React.FC<SwitchPropType> = ({
  showSearch,
  setShowSearch,
}: SwitchPropType) => {
  const handleNavButtons = () => {
    setShowSearch(!showSearch);
  };
  return (
    <div className="border shadow-lg w-full py-2 flex justify-center items-center gap-4 ">
      <Button onClick={handleNavButtons}>Search</Button>
      <Button onClick={handleNavButtons}>Lyrics</Button>
    </div>
  );
};

export default Switch;
