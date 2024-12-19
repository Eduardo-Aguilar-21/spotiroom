import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (!token) {
      // Si no hay token, inicia el proceso de autenticación
      const clientId = '318f57c6f0cb4e609b36948374583a22';
      const redirectUri = 'http://localhost:3001/callback';
      const scope = 'user-read-private user-read-email playlist-read-private';

      const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${scope}&redirect_uri=${encodeURIComponent(redirectUri)}`;  window.location.href = authUrl;
      //navigate(authUrl);
    } else {
      // Si ya hay un token, redirige al usuario a la página principal
      navigate('/home');
    }
  }, [navigate]);

  return <div>Redirigiendo a Spotify para autenticación...</div>;
};

export default Auth;