import React, { useEffect, useState } from "react";
import axios from "axios";

export function useTopSongs() {
  const [topSongs, setTopSongs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopSongs = async () => {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        setError("No estás autenticado.");
        return;
      }

      try {
        const response = await axios.get('https://api.spotify.com/v1/me/top/tracks?limit=4', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          const topSongsList = response.data.items;
          setTopSongs(topSongsList); // Guardamos las canciones más escuchadas
      } catch (err) {
        console.error("Error en la respuesta de la API:", err.response ? err.response.data : err.message);
        setError("Error al obtener los artistas más escuchados.");
      }
    };

    fetchTopSongs();
  }, []);

  return { topSongs, error };
}
