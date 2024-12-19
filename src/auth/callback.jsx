// src/components/Auth/Callback.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener el código de autorización de la URL
    const queryParams = new URLSearchParams(window.location.search);
    const authCode = queryParams.get("code");

    if (authCode) {
      // Intercambiar el código por un Access Token
      const clientId = "318f57c6f0cb4e609b36948374583a22";
      const clientSecret = "44aac3d78458455393ab794bc2557646";
      const redirectUri = "http://localhost:3001/callback";

      const authTokenUrl = "https://accounts.spotify.com/api/token";
      const body = new URLSearchParams({
        code: authCode,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      });

      const headers = new Headers();
      headers.append("Authorization", "Basic " + btoa(`${clientId}:${clientSecret}`));
      headers.append("Content-Type", "application/x-www-form-urlencoded");

      fetch(authTokenUrl, {
        method: "POST",
        headers: headers,
        body: body,
      })
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((data) => {
          console.log(data); // Aquí puedes ver la respuesta completa
          if (data.error) {
            console.error("Error en la respuesta:", data.error_description);
            return;
          }
          localStorage.setItem("access_token", data.access_token);
          navigate("/home");
        })
        .catch((error) => console.error("Error al obtener el token:", error));
    }
  }, []);

  return (
    <div>
      <h2>Autenticando...</h2>
    </div>
  );
};

export default Callback;
