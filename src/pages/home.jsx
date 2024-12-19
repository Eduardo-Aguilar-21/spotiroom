import React from "react";
import NavigationBar from "../components/navbar";
import { RecentArtists } from "../components/recent-artists";
import { useRecentArtists } from "../hooks/useRecentArtists"; // Importamos el hook
import { Container, Row, Col, Button } from "react-bootstrap"; // Importamos los componentes de react-bootstrap
import { TopArtists } from "../components/top-artists";
import { TopSongs } from "../components/top-songs";

export function Home() {
  return (
    <div>
      <NavigationBar />
      <Container className="mt-4">
        <h1>Bienvenido a Spotiroom</h1>
        <p>Aquí podrás explorar tu música favorita y descubrir nuevas canciones.</p>
        <h2>Resumen de tu actividad:</h2>
        <Row>
          {/* Columna izquierda: ocupa la mitad de la pantalla */}
          <Col md={6}>
            <TopArtists />
          </Col>

          {/* Columna derecha: puedes dejarla vacía o agregar otro contenido */}
          <Col md={6}>
            <TopSongs />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
