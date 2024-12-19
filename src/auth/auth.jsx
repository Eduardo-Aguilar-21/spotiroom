import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Global from "../global/global";
import axios from "axios";

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const spoty_url = `https://accounts.spotify.com/authorize?client_id=${Global.client_id}&response_type=code&redirect_uri=${Global.redirect_uri}&scope=${Global.scopes}`;

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const spotyCode = urlParams.get("code");
    if (spotyCode) {
      autenticateUser(spotyCode);
    }
  }, [location]); // Se agrega location como dependencia

  const autenticateUser = (spotyCode) => {
    const searchParams = new URLSearchParams({
      code: spotyCode,
      grant_type: "authorization_code",
      redirect_uri: Global.redirect_uri,
      client_id: Global.client_id,
      client_secret: Global.client_secret,
    });

    axios
      .post("https://accounts.spotify.com/api/token", searchParams)
      .then((res) => {
        console.log("Token recibido:", res.data);
        localStorage.setItem("access_token", res.data.access_token);
        localStorage.setItem("refresh_token", res.data.refresh_token);
        navigate("/home");
        console.log("Buien")
      })
      .catch((error) => {
        console.error("Error durante la autenticación:", error);
      });
  };

  const login = () => {
    window.location.replace(spoty_url); // Redirige al usuario a la página de login de Spotify
  };

  return (
    <div className="general">
      <h3>
        Redirigiendo a Spotify para autenticación...
        <br />
        Visualiza toda la información de tu perfil de Spotify
      </h3>
      <button onClick={login} id="btnLogin" className="btnLogin">
        INICIAR SESION
      </button>
    </div>
  );
};

export default Auth;
