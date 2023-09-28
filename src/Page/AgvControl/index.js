import React, { useState } from "react";
import FrameDashboard from "../../Component/FrameDashboard";
import { Button, Col, Collapse, Form, Row, Table } from "react-bootstrap";
import { left } from "@popperjs/core";
import { BiListCheck } from "react-icons/bi";
import { Modal } from "rsuite";
import axios from "axios";
// import App from "./Connection";
// import HookMqtt from "../../Config/HookMqtt";

function AgvControl() {
  const [open, setOpen] = useState(false);
  const [buttonName, setButtonName] = useState("Auto");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAutoSwitch = () => {
    setOpen(!open);
    if (buttonName === "Auto") {
      setButtonName("Manual");
    } else {
      setButtonName("Auto");
    }
  };

  const handleAGVRUn = (e) => {
    console.log(e.target.id);
    const data = {
      MESSAGE: 1,
    };

    console.log(data);

    axios
      .post("http://192.168.30.47:4000/api/agv/agvSendMessage", data)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAGVStop = () => {
    const data = {
      MESSAGE: 0,
    };

    console.log(data);

    axios
      .post("http://192.168.30.47:4000/api/agv/agvSendMessage", data)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <FrameDashboard>
        <div style={{ padding: 10, textAlign: "left" }}>
          <Col>
            {
              // Digunakan untuk memilih antara mode auto dan mode manual
              <Form.Check // prettier-ignore
                type="switch"
                id="custom-switch"
                label="Mode AGV"
                size={"50"}
                style={{ padding: 30, textAlign: "left" }}
                onClick={() => setOpen(!open)}
              />
            }

            {/* Digunakan untuk mentrigger secara manual si AGV agar bergerak mengambil barang */}
            <Collapse
              in={open}
              style={{
                textAlign: "left",
                width: 500,
              }}
            >
              <div id="settin-manual-agv">
                <Button variant="primary" id="test" onClick={handleAGVRUn}>
                  AGV RUN
                </Button>
                <Button
                  variant="danger"
                  onClick={handleAGVStop}
                  style={{ marginLeft: 10 }}
                >
                  AGV STOP
                </Button>
              </div>
            </Collapse>
          </Col>
        </div>

        {/* Tabel yang digunakan untuk menampilkan alarm apa saja yang terjadi pada AGV  */}
        <div className="title-section">
          <BiListCheck />
          Alarm List
        </div>
        <Table>
          <thead>
            <tr>
              <th>No</th>
              <th>Alarm Detail</th>
              <th>Alarm Code</th>
              <th>Alarm Start</th>
              <th>Alarm Finish</th>
            </tr>
          </thead>
        </Table>

        {/* Tabel yang digunakan untuk menampilkan kondisi aktual dari AGV secara realtime */}
        <div className="title-section">
          <BiListCheck />
          Realtime AGV Monitoring
        </div>
        <Table>
          <thead>
            <tr>
              <th>No</th>
              <th>Alarm Detail</th>
              <th>Alarm Code</th>
              <th>Alarm Start</th>
              <th>Alarm Finish</th>
            </tr>
          </thead>
        </Table>
      </FrameDashboard>

      {/* Digunakan untuk menampilkan pop up saat koneksi antara AGV dengan server terputus */}
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>AGV Disconnected !</Modal.Title>
          </Modal.Header>
          <Modal.Body>Check connection between AGV and server!</Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default AgvControl;
