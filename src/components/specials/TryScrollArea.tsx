import * as React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { SearchResultType } from "../SearchTile";
import axios from "axios";
import Link from "next/link";

export function ScrollAreaHorizontalDemo() {
  const [allItems, setAllItems] = useState<SearchResultType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getAllLyrics() {
      setLoading(true);
      try {
        const response = await axios.get(`/api/allLyrics`);
        if (!response) {
          throw new Error("failed to fetch All Lyrics");
        }
        setAllItems(response.data.result);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getAllLyrics();
  }, []);
  if (loading) {
    return <div className="loader"></div>;
  }
  return (
    <ScrollArea className="whitespace-nowrap rounded-md pl-2">
      <div className="flex w-max space-x-4 p-4">
        {allItems?.map((item) => (
          <Link href={`/lyrics/${item._id}`} key={item._id}>
            <figure className="shrink-0 ">
              <div className="overflow-hidden rounded-md">
                <img
                  src={item.albumArt}
                  alt={`Photo by ${item.albumArt}`}
                  className="aspect-[6/4] h-32  object-cover"
                />
              </div>
              <figcaption className="pt-2 text-xs text-muted-foreground">
                {item.singer.name}
                <span className="text-white px-2 font-semibold text-foreground">
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
