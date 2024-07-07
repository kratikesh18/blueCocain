import React from "react";
import { LyricsLine as LyricsLineType } from "@/models/LyricsModel";
import { Input } from "../ui/input";

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
            className="text-2xl font-semibold border-b-2 border-black"
            defaultValue={line.line}
            onChange={(e) => handleLineChange(index, "line", e.target.value)}
          />
        </div>
      ) : (
        <h1 className={`${isCurrent ? "text-gray-100" : "text-transparent/85"}`}>{line.line}</h1>
      )}
      <div className="flex justify-between text-xs text-gray-200">
        <p>{new Date(line.startTime * 1000).toISOString().substr(14, 5)}</p>
        <p>{new Date(line.endTime * 1000).toISOString().substr(14, 5)}</p>
      </div>
    </div>
  );
};

export default LyricsLine;
