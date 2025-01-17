import * as React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { SearchResultType } from "../SearchTile";
import Link from "next/link";
import { Artist } from "@/models/ArtistModel";

type ScrollAreasTypes = {
  allItems?: SearchResultType[] | null;
  allSingers?: Artist[] | null;
  allLiked?: SearchResultType[] | null;
};
export function ScrollAreas({
  allItems,
  allSingers,
  allLiked,
}: ScrollAreasTypes) {
  if (allItems && !allSingers && !allLiked) {
    return (
      <ScrollArea className="whitespace-nowrap rounded-md pl-2">
        <div className="flex w-max space-x-4 p-4">
          {allItems?.map((item) => (
            <Link href={`/lyrics/${item._id}`} key={item._id} className="">
              <figure className="shrink-0">
                <div className="overflow-hidden rounded-md">
                  <img
                    src={item.albumArt || item.albumDetails?.albumArt}
                    alt={`Photo by ${item.albumArt}`}
                    className="aspect-[6/4] h-32 w-full object-cover"
                  />
                </div>
                <figcaption className="pt-2 text-sm text-gray-300">
                  {item.singer.name}
                  <span className="text-white text-base truncate font-semibold text-foreground block  ">
                    {item.songName}
                  </span>
                </figcaption>
              </figure>
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    );
  }
  if (allSingers && !allItems && !allLiked) {
    return (
      <ScrollArea className="whitespace-nowrap rounded-md pl-2">
        <div className="flex w-max space-x-4 p-4">
          {allSingers?.map((eachArtist, index) => (
            <Link href={`/artist/${eachArtist._id}`} key={index}>
              <figure className="shrink-0 ">
                <div className="overflow-hidden rounded-md">
                  <img
                    src={eachArtist.artistProfileImage}
                    alt={`Photo of ${eachArtist.name}`}
                    className="aspect-square h-32 rounded-full  object-cover"
                  />
                </div>
                <figcaption className="pt-2 text-gray-200 text-xs text-center">
                  {eachArtist.name}
                  {/* <span className="text-white px-2 font-semibold text-foreground">
                    {item}
                  </span> */}
                </figcaption>
              </figure>
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    );
  }
  if (allLiked && !allSingers && !allItems) {
    return <h1 className="text-white text-lg">showing all liked items</h1>;
  }
}
