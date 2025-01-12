import Link from "next/link";
import React from "react";
interface ArtistAlbumType {
  album: {
    _id: string;
    albumName: string;
    albumArt: string;
    releaseDate: string;
    genre: string;
  };
}
const AlbumDetailsArtist = ({ album }: ArtistAlbumType) => {
  return (
    <Link
      href={`/Library/AllAlbums/AlbumDetails/${album._id}`}
      key={album._id}
      className=" flex flex-col p-2 gap-1 border-[1px] h-fit w-40 border-white/30 rounded-lg shadow-lg m-2"
    >
      <img
        src={album.albumArt}
        alt={album.albumName}
        className="object-cover rounded aspect-square "
      />
      <h3 className="text-xl font-bold truncate">{album.albumName}</h3>
      <div className="flex text-muted-foreground text-sm justify-between items-center">
        <p className="text-gray-400 ">
          {new Date(album.releaseDate).getFullYear()}
        </p>
        <p>{album.genre}</p>
      </div>
    </Link>
  );
};

export default AlbumDetailsArtist;
