import React from "react";
import { Spinner, Row, Col, Card, Image } from "react-bootstrap";

// Componente genérico para mostrar una lista de elementos
function ItemList({ items, error, title, imageKey, nameKey }) {
  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  return (
    <div className="mt-4">
      <h3>{title}</h3>

      {/* Si los items están cargando, muestra un Spinner */}
      {items.length === 0 ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <Row>
          {items.map((item) => (
            <Col key={item.id} xs={12} sm={6} md={4} lg={3}>
              <Card className="mb-4">
                <Card.Body className="d-flex flex-column align-items-center">
                  <Image
                    src={
                      item.album ? // Si el item tiene album (canciones)
                        item.album.images[0]?.url || "/default-image.jpg" // Muestra la imagen del álbum o imagen por defecto
                        : item[imageKey] && item[imageKey][0]?.url // Si no, usa la imagen pasada por prop (por ejemplo, para artistas)
                          ? item[imageKey][0]?.url
                          : "/default-image.jpg" // Imagen por defecto si no hay imagen
                    }
                    alt={item[nameKey]}
                    roundedCircle
                    style={{ width: "80px", height: "80px" }}
                  />
                  <Card.Title
                    className="mt-2"
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "150px", // Limita el ancho del título
                    }}
                  >
                    {item[nameKey]}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Si no hay items, mostrar un mensaje */}
      {items.length === 0 && !error && <p>No se han encontrado {title.toLowerCase()}.</p>}
    </div>
  );
}

export default ItemList;
