import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Panel } from "rsuite";
import "./login.css";

function Login() {
  return (
    <h1>
      <div className="loginform">
        <Panel
          bordered
          style={{ background: "#fff", width: 400 }}
          header={<h3>Sign In</h3>}
        >
          <p style={{ marginBottom: 10 }}>
            <span className="text-muted">New Here? </span>{" "}
            <Link to="/signup"> Create an Account</Link>
          </p>
          <Row>
            <Form as={Col} style={{ textAlign: "left" }}>
              <Form.Group>
                <Form.Label>NPK</Form.Label>
                <Form.Control type="text" placeholder="Enter NPK" />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Your Password"
                />
              </Form.Group>
              <Button type="submit">Sign in</Button>
            </Form>
          </Row>
        </Panel>
      </div>
    </h1>
  );
}

export default Login;
