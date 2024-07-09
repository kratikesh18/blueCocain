import React, { useState } from "react";
import { LyricsLine as LyricsLineType } from "@/models/LyricsModel";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import LyricsLine from "./LyricsLIne";
import { ScrollArea } from "../ui/scroll-area";

interface LyricsEditorProps {
  updatedLyrics: LyricsLineType[];
  setUpdatedLyrics: React.Dispatch<React.SetStateAction<LyricsLineType[]>>;
  handleLineChange: (
    index: number,
    field: string,
    value: string | number
  ) => void;
}

const LyricsEditor: React.FC<LyricsEditorProps> = ({
  updatedLyrics,
  setUpdatedLyrics,
  handleLineChange,
}) => {
  const [newLine, setNewLine] = useState<string>("");

  const addLine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLine.trim()) return;

    const lastLine = updatedLyrics[updatedLyrics.length - 1];
    const newStartTime = lastLine ? lastLine.endTime : 0;
    const newEndTime = newStartTime + 5;

    setUpdatedLyrics((prev) => [
      ...prev,
      { line: newLine, startTime: newStartTime, endTime: newEndTime },
    ]);
    setNewLine("");
  };

  return (
    <>
      {updatedLyrics.map((line, index) => (
        <LyricsLine
          key={index}
          line={line}
          isEditing={true}
          isCurrent={false}
          index={index}
          handleLineChange={handleLineChange}
        />
      ))}
      <form onSubmit={addLine} className="flex gap-2 mt-4">
        <Input
          type="text"
          className="text-2xl font-semibold border-b-2 border-black"
          placeholder="Add a new line..."
          value={newLine}
          onChange={(e) => setNewLine(e.target.value)}
        />
        <Button type="submit">Add Line</Button>
      </form>
    </>
  );
};

export default LyricsEditor;
