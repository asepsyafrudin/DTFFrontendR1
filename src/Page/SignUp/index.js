import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
// import { Link } from "react-router-dom";
import { Panel } from "rsuite";

function SignUp() {
  return (
    <h1>
      <div className="loginform">
        <Panel
          bordered
          style={{ background: "#fff", width: 400 }}
          header={<h3>Sign Up</h3>}
        >
          <Row>
            <Form style={{ textAlign: "left" }}>
              <Form.Group as={Col}>
                <Form.Label>NPK</Form.Label>
                <Form.Control type="text" placeholder="Enter NPK" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Your Password"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Your Password"
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Departement</Form.Label>
                <Form.Select>
                  <option value={""} disabled>
                    open this
                  </option>
                  <option value={"President"}>President</option>
                  <option value={"Director"}>Director</option>
                  <option value={"Coordinator"}>Manager</option>
                  <option value={"General Manager"}>General Manager</option>
                  <option value={"Assistant General Manager"}>
                    Assistant General Manager
                  </option>
                  <option value={"Departement Manager"}>
                    Departement Manager
                  </option>
                  <option value={"Manager"}>Manager</option>
                  <option value={"Assistant Manager"}>Assistant Manager</option>
                  <option value={"Staff"}>Staff</option>
                  <option value={"Administrator"}>Administrator</option>
                </Form.Select>
              </Form.Group>
              <Button type="submit">Sign Up</Button>
            </Form>
          </Row>
        </Panel>
      </div>
    </h1>
  );
}

export default SignUp;
