import Link from "next/link";
import React from "react";
interface ArtistResultType {
  _id: string;
  name: string;
  artistProfileImage: string;
}
const ArtistResult = ({ artistResult }: { artistResult: ArtistResultType }) => {
  return (
    <Link href={`/artist/${artistResult._id}`}>
      <div className="flex justify-around items-center gap-2">
        <img
          src={artistResult.artistProfileImage}
          className="aspect-square rounded-full h-full w-full"
        />
        <h1>{artistResult.name}</h1>
      </div>
    </Link>
  );
};

export default ArtistResult;
