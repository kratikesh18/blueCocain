import Link from "next/link";
import React from "react";

interface SingerDetails {
  name: string;
  _id: string;
}

interface ArtistSearchResultProps {
  artistDetails: SingerDetails[] | null;
  artistname: string;
  findingArtist: boolean;
  setArtistname: React.Dispatch<React.SetStateAction<string>>;
  setFieldValue: (value: string) => void;
}

const ArtistSearchResult: React.FC<ArtistSearchResultProps> = ({
  artistDetails,
  artistname,
  findingArtist,
  setArtistname,
  setFieldValue,
}) => {
  return (
    <>
      {artistDetails && artistDetails.length > 0 ? (
        <p className="text-sm text-gray-400 mt-1">
          Found Artist:{" "}
          {artistDetails.map((eachArtist) => (
            <span
              key={eachArtist._id}
              onClick={() => {
                setFieldValue(eachArtist.name);
                setArtistname(eachArtist.name);
              }}
              className="font-semibold text-gray-200 border-2 p-1 underline cursor-pointer"
            >
              {eachArtist.name}
            </span>
          ))}
        </p>
      ) : (
        artistname && (
          <div className="text-sm text-gray-300">
            {findingArtist ? (
              <div>
                <h1>Searching....</h1>
              </div>
            ) : (
              <span className="flex gap-2">
                <h1 className="text-gray-400">No Artist Found :</h1>
                <Link
                  href={`/addLyrics/newArtistProfile/${artistname}`}
                  className="text-white underline"
                >
                  Create Artist Profile
                </Link>
              </span>
            )}
          </div>
        )
      )}
    </>
  );
};

export default ArtistSearchResult;
