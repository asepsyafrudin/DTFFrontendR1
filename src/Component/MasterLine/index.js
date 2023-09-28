import { PageNext } from "@rsuite/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Form, CloseButton } from "react-bootstrap";
import { Button, Modal } from "rsuite";
import {
  createMasterLineApi,
  createMasterMachineApi,
  getAllMasterLineAPi,
} from "../../Config/api";

function MasterLine() {
  const [lineId, setLineId] = useState("");
  const [line, setLine] = useState("");
  const [machine, setMachine] = useState("");
  const [tableLine, setTableLine] = useState([]);
  const [tableMachine, setTableMachine] = useState([]);
  const [titleMachine, setTitleMachine] = useState("");
  const [showFormLine, setShowFormLine] = useState(false);
  const [showFormMachine, setShowMachine] = useState(false);

  useEffect(() => {
    axios.get(getAllMasterLineAPi).then((result) => {
      setTableLine(result.data.data);
    });
  }, [line]);

  const handleSaveLine = (e) => {
    e.preventDefault();
    const data = {
      LINE_NAME: line,
    };
    axios.post(createMasterLineApi, data).then((result) => {
      setLine("");
    });
  };

  const handleSaveMachine = (e) => {
    e.preventDefault();
    const data = {
      LINE_ID: parseInt(lineId),
      MACHINE_NAME: machine,
    };

    axios.post(createMasterMachineApi, data).then((result) => {
      setMachine("");
    });
  };

  const handleViewDetail = (e) => {
    setLineId(e.target.id);
    const lineFilter = tableLine.find(
      (value) => value.ID === parseInt(e.target.id)
    );

    if (lineFilter) {
      console.log(lineFilter);
      setTitleMachine(lineFilter.LINE_NAME);
      setTableMachine(lineFilter.machine);
    }
  };

  return (
    <div>
      <div style={{ textAlign: "right" }}>
        <Button appearance="primary" onClick={() => setShowFormLine(true)}>
          Add Line
        </Button>
      </div>
      <div className="title-section"> Master Line</div>
      <Table hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Line Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableLine.map((value, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{value.LINE_NAME}</td>
                <td>
                  <Button id={value.ID} onClick={handleViewDetail}>
                    view detail <PageNext />{" "}
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {lineId && (
        <>
          <div style={{ marginTop: 5, textAlign: "right" }}>
            <Button appearance="primary" onClick={() => setShowMachine(true)}>
              Add Machine
            </Button>
          </div>
          <div className="title-section">
            Master Machine of {titleMachine}{" "}
            <CloseButton onClick={() => setLineId("")} />
          </div>
          <Table hover>
            <thead>
              <th>No</th>
              <th>Machine Name</th>
              <th>Actions</th>
            </thead>
            <tbody>
              {tableMachine.map((value, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{value.MACHINE_NAME}</td>
                    <td>
                      <Button>Delete</Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </>
      )}

      <Modal open={showFormLine} onClose={() => setShowFormLine(false)}>
        <Modal.Header>
          <Modal.Title style={{ fontWeight: "bold" }}>
            Register Line
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSaveLine}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Line Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Line Name"
                value={line}
                onChange={(e) => setLine(e.target.value)}
                name="line"
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" appearance="primary">
              Ok
            </Button>
            <Button onClick={() => setShowFormLine(false)} appearance="subtle">
              Cancel
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Modal open={showFormMachine} onClose={() => setShowMachine(false)}>
        <Modal.Header>
          <Modal.Title>Register Machine</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSaveMachine}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Machine Name</Form.Label>
              <Form.Control
                name="machine"
                type="text"
                placeholder="Enter Line Name"
                value={machine}
                onChange={(e) => setMachine(e.target.value)}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" appearance="primary">
              Ok
            </Button>
            <Button onClick={() => setShowMachine(false)} appearance="subtle">
              Cancel
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default MasterLine;
