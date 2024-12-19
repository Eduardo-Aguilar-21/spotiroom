import React from "react";
import { useTopArtists } from "../hooks/useTopArtists";
import ItemList from "./item-list";


export function TopArtists() {
  const { topArtists, error } = useTopArtists();

  return (
    <ItemList
      items={topArtists}
      error={error}
      title="Artistas más escuchados"
      imageKey="images"
      nameKey="name"
    />
  );
}
