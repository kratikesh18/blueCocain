import Link from "next/link";
import React from "react";

interface AlbumDetails {
  _id: string;
  albumName: string;
  by: { name: string };
  releaseDate: string;
}

interface AlbumSearchResultProps {
  albumDetails: AlbumDetails[] | null;
  albumName: string;
  setAlbumName: React.Dispatch<React.SetStateAction<string>>;
  setFieldValue: (value: string) => void;
}

const AlbumSearchResult: React.FC<AlbumSearchResultProps> = ({
  albumDetails,
  albumName,
  setAlbumName,
  setFieldValue,
}) => {
  
  return (
    <>
      {albumDetails && (
        <p className="text-sm text-gray-400 mt-1">
          <div>
            Found Albums:{" "}
            {albumDetails.map((eachAlbum) => (
              <span
                key={eachAlbum._id}
                onClick={() => {
                  setFieldValue(eachAlbum.albumName);
                  setAlbumName(eachAlbum._id);
                  console.log(albumName);
                }}
                className="font-semibold text-gray-200 border-2 p-1 underline cursor-pointer"
              >
                {eachAlbum.albumName}
              </span>
            ))}
          </div>
        </p>
      )}
      {albumName && !albumDetails && (
        <div className="text-sm text-gray-300">
          {/* {findingArtist ? ( */}
          {/* <div>
              <h1>Searching....</h1>
            </div>
          ) : ( */}
          <span className="flex gap-2">
            <h1 className="text-gray-400">No Album Found :</h1>
            <Link
              href={`/addLyrics/createAlbum/${albumName}`}
              className="text-white underline"
            >
              Create Album
            </Link>
          </span>
          {/* ) */}
          {/* } */}
        </div>
      )}
    </>
  );
};

export default AlbumSearchResult;
