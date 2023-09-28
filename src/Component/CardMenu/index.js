import React from "react";
import { Badge, Col, Row } from "react-bootstrap";
import "./cardMenu.css";
import { Link } from "react-router-dom";

function CardMenu({ title, srcImg, to, colorTitle }) {
  return (
    <Link to={to}>
      <div className="card-menu">
        <Row>
          <Col lg={4}>
            <div
              style={{
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              <Badge bg={colorTitle}>{title}</Badge>
            </div>
          </Col>
          <Col lg={8}>
            <img src={srcImg} alt="icon-card" className="imageCard" />
          </Col>
        </Row>
      </div>
    </Link>
  );
}

export default CardMenu;
