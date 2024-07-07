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
      {artistDetails && (
        <p className="text-sm text-gray-400 mt-1">
          <div>
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
          </div>
        </p>
      )}
      {artistname && !artistDetails && (
        <div className="text-sm text-gray-300">
          {findingArtist ? "Searching..." : "No Artists Found: Contribute"}
        </div>
      )}
    </>
  );
};

export default ArtistSearchResult;
