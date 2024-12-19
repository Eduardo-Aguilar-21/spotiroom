import React from "react";
import { useTopSongs } from "./../hooks/useTopSongs";
import ItemList from "./item-list";

export function TopSongs() {
  const { topSongs, error } = useTopSongs();

  return (
    <ItemList
      items={topSongs}
      error={error}
      title="Top Canciones"
      imageKey="album.images"
      nameKey="name"
    />
  );
}
