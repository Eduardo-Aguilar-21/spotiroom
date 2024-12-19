// src/components/Navbar.js
import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const navigate = useNavigate();

const handleLogout = () => {
  // Limpia todos los datos locales
  localStorage.removeItem('access_token');
  sessionStorage.clear();

  // Redirige al logout de Spotify
  const spotifyLogoutUrl = 'https://accounts.spotify.com/en/logout';
  const homeUrl = 'http://localhost:3001/auth'; // Redirigir a tu componente Auth después del logout

  // Abre el logout de Spotify en una nueva ventana y redirige a Auth
  const logoutWindow = window.open(spotifyLogoutUrl, '_blank', 'width=700,height=500');
  setTimeout(() => {
    logoutWindow?.close();
    navigate('/auth'); // Redirige al proceso de login
  }, 1000); // Espera un momento antes de redirigir
};

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/home">Spotiroom</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">Inicio</Nav.Link>
            <Nav.Link href="/about">Acerca de</Nav.Link>
          </Nav>
          <Button variant="outline-light" onClick={handleLogout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
