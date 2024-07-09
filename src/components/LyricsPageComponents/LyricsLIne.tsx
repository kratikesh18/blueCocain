import React from "react";
import { LyricsLine as LyricsLineType } from "@/models/LyricsModel";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface LyricsLineProps {
  line: LyricsLineType;
  isEditing: boolean;
  isCurrent: boolean;
  index: number;
  handleLineChange: (
    index: number,
    field: string,
    value: string | number
  ) => void;
}

const LyricsLine: React.FC<LyricsLineProps> = ({
  line,
  isEditing,
  isCurrent,
  index,
  handleLineChange,
}) => {
  return (
    <div
      className={`p-2 rounded transition-all duration-300 ${
        isCurrent ? "" : ""
      }`}
    >
      {isEditing ? (
        <div className="flex">
          <Input
            type="text"
            className="text-2xl font-semibold border-b-2 border-black text-gray-300"
            defaultValue={line.line}
            onChange={(e) => handleLineChange(index, "line", e.target.value)}
          />
        </div>
      ) : (
        <div>
          <h1 className={`${isCurrent ? "text-white" : "text-gray-400/90"}`}>
            {line.line}
          </h1>
        </div>
      )}

      <div
        className={`flex justify-between text-xs mt-[4px] ${
          isCurrent ? "text-white" : "text-gray-400/70"
        }`}
      >
        <p>{new Date(line.startTime * 1000).toISOString().substr(14, 5)}</p>
        <p>{new Date(line.endTime * 1000).toISOString().substr(14, 5)}</p>
      </div>
    </div>
  );
};

export default LyricsLine;
