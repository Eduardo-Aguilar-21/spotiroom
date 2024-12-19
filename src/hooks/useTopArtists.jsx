import { useState, useEffect } from 'react';
import axios from 'axios';

export function useTopArtists() {
  const [topArtists, setTopArtists] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopArtists = async () => {
      const accessToken = localStorage.getItem('access_token');

      if (!accessToken) {
        setError("No estás autenticado.");
        return;
      }

      try {
        
        const response = await axios.get('https://api.spotify.com/v1/me/top/artists?limit=4', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const topArtistsList = response.data.items;
        setTopArtists(topArtistsList); // Guardamos los artistas más escuchados

      } catch (err) {
        console.error("Error en la respuesta de la API:", err.response ? err.response.data : err.message);
        setError("Error al obtener los artistas más escuchados.");
      }
    };

    fetchTopArtists();
  }, []);

  return { topArtists, error };
}
