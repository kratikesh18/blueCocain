"use client";
import TheLyrics from "@/components/TheLyrics";
import { Button } from "@/components/ui/button";
import { LyricsLine } from "@/models/LyricsModel";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

const LyricsPage = () => {
  const { songid } = useParams();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <div>
      <TheLyrics
        songId={songid.toString()}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
      {/* <Link href={`/editlyrics/${songid}`}>go to contribute</Link> */}
      {!isEditing && (
        <Button
          onClick={() => {
            setIsEditing(true);
            // router.push(`/editlyrics/${songid}`);
          }}
          className="rounded-full fixed -right-0 mr-4 -bottom-0 mb-4  h-16 w-16 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        </Button>
      )}
      {/* {isEditing && (
        <Button
          onClick={() => setIsEditing(false)}
          className="rounded-md fixed -right-0 mr-4 -bottom-0 mb-4   "
        >
          Submit for review
        </Button>
      )} */}
    </div>
  );
};

export default LyricsPage;

//****************** USE LATER ***************/
// "use client";

// import { useEffect } from "react";
// import { useLyrics } from "@/context/LyricsContext";
// import { useParams } from "next/navigation";
// import React from "react";

// const LyricsPage = () => {
//   const { lyrics, error, loading, fetchLyrics } = useLyrics();
//   const { query } = useParams();

//   useEffect(() => {
//     if (query) {
//       fetchLyrics(query);
//     }
//   }, [query, fetchLyrics]);

//   return (
//     <div className="p-4">
//       {loading && <div>Loading...</div>}
//       {error && <div>Error: {error}</div>}
//       {lyrics && (
//         <div>
//           {lyrics.map((lyric, index) => (
//             <div key={index} className="border p-2 mb-2">
//               <h1 className="text-lg font-bold">{lyric.songName}</h1>
//               <p className="text-sm">Artist: {lyric.artist.name}</p>
//               <p className="text-sm">Album: {lyric.albumName}</p>
//               <p className="text-sm">Genre: {lyric.genre}</p>
//               <p className="text-sm">
//                 Release Date:{" "}
//                 {lyric.releaseDate &&
//                   new Date(lyric.releaseDate).toLocaleDateString()}
//               </p>
//               <div className="mt-4">
//                 <h2 className="text-md font-semibold">Lyrics:</h2>
//                 {lyric.lyricsText.map((line, lineIndex) => (
//                   <div key={line._id} className="mb-2">
//                     <p>
//                       {line.startTime}s - {line.endTime}s: {line.line}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default LyricsPage;
