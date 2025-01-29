import Link from "next/link";
import React from "react";
interface ArtistResultType {
  _id: string;
  name: string;
  artistProfileImage?: string;
}

const ArtistResult = ({ artistResult }: { artistResult: ArtistResultType }) => {
  return (
    <Link
      href={`/artist/${artistResult._id}`}
      className="flex gap-4 p-2 items-center border rounded-md"
    >
      <div className="w-1/4 h-1/4 rounded-full border-2">
        <img
          src={artistResult.artistProfileImage}
          alt=""
          className="object-cover w-full h-full rounded-full aspect-square"
        />
      </div>
      <div>
        <h1>{artistResult.name}</h1>
      </div>
    </Link>
  );
};

export default ArtistResult;
