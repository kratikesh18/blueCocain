import React from "react";
import { SearchResultType } from "./Searchbar";
import Link from "next/link";

const SearchTile = ({ item }: { item: SearchResultType }) => {
  return (
    <Link
      href={`/lyrics/${item._id}`}
      className="flex border-2 bg-white border-gray-400 p-3 w-full justify-between"
    >
      <div>
        <h1 className="text-lg font-semibold">{item.songName}</h1>
        <h1 className="">{item.albumName}</h1>
        <h1 className="text-sm">2014</h1>
      </div>
      <div>
        <h1 className="text-base font-semibold">{item.artist.name}</h1>
        <h1 className="text-sm">{item.genre}</h1>
      </div>
    </Link>
  );
};

export default SearchTile;
