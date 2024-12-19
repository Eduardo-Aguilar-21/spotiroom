import React from "react";
import { useRecentArtists } from "../hooks/useRecentArtists";
import ItemList from "./item-list";

export function RecentArtists() {
  const { recentArtists, error } = useRecentArtists();

  return (
    <ItemList
      items={recentArtists}
      error={error}
      title="Artistas más recientes"
      imageKey="images"
      nameKey="name"
    />
  );
}
