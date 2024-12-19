import { useState, useEffect } from 'react';
import axios from 'axios';

export function useRecentArtists() {
  const [recentArtists, setRecentArtists] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtists = async () => {
      const accessToken = localStorage.getItem('access_token');

      if (!accessToken) {
        setError("No estás autenticado.");
        return;
      }

      try {
        const response = await axios.get('https://api.spotify.com/v1/me/following?type=artist&limit=4', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const recentArtistsList = response.data.artists.items;
        setRecentArtists(recentArtistsList); // Guardamos los primeros 5 artistas

      } catch (err) {
        console.error("Error en la respuesta de la API:", err.response ? err.response.data : err.message);
        setError("Error al obtener los artistas.");
      }
    };

    fetchArtists();
  }, []);

  return { recentArtists, error };
}
