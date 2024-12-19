import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/navbar';

export function Home() {
  const [artists, setArtists] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtists = async () => {
        const accessToken = localStorage.getItem('access_token');
        console.log("Token almacenado:", accessToken);
      
        if (!accessToken) {
          setError("No estás autenticado.");
          return;
        }
      
        try {
          const response = await fetch('https://api.spotify.com/v1/me/following?type=artist', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
      
          if (!response.ok) {
            // Imprimir detalles de la respuesta para ver por qué se recibe un 403
            const errorData = await response.json();
            console.error("Error en la respuesta de la API:", errorData);
            throw new Error(`Error al obtener los artistas: ${response.statusText}`);
          }
      
          const data = await response.json();
          setArtists(data.artists.items); // La API devuelve los artistas en `data.artists.items`
        } catch (err) {
          setError(err.message);
        }
      };
    fetchArtists();
  }, []);

  return (
    <div>
      <NavigationBar />
      <div className="container mt-4">
        <h1>Bienvenido a Spotiroom</h1>
        <p>Aquí podrás explorar tu música favorita y descubrir nuevas canciones.</p>
        {error ? (
          <p className="text-danger">{error}</p>
        ) : (
          <div>
            <h2>Artistas que sigues:</h2>
            <ul>
              {artists.map((artist) => (
                <li key={artist.id}>
                  <img
                    src={artist.images[0]?.url}
                    alt={artist.name}
                    style={{ width: '50px', height: '50px', marginRight: '10px' }}
                  />
                  {artist.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
