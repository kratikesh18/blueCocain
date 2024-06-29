"use client";
import TheLyrics from "@/components/TheLyrics";
import { useParams } from "next/navigation";
import React from "react";

const page = () => {
  const { songid } = useParams();

  return (
    <div>
      <TheLyrics songId={songid.toString()} />
    </div>
  );
};

export default page;

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
