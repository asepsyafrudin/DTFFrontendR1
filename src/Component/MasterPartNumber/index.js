import React, { useEffect, useState } from "react";
import { BiListCheck } from "react-icons/bi";
import { Button } from "rsuite";
import { Col, FloatingLabel, Form, Modal, Row, Table } from "react-bootstrap";
import {
  BEKASI,
  CHILD_FINAL_ASSY,
  CHILD_SUB_ASSY,
  FAJAR,
  FINAL_ASSY,
  GATE_A,
  GATE_B,
  SUB_ASSY,
  SUNTER,
  SUPPLIER_A,
  SUPPLIER_B,
  SUPPLIER_C,
  SUPPLIER_D,
  WH_BAGUS,
  WH_SELATAN,
  WH_SIP,
  WH_TIMUR,
} from "../../Config/const";
import axios from "axios";
import {
  createMasterPartNumberApi,
  getAllMasterPartNumberApi,
  updateMasterPartNumberApi,
} from "../../Config/api";

function MasterPartNumber() {
  const [line, setLine] = useState("");
  const [partNumber, setPartNumber] = useState("");
  const [partName, setPartName] = useState("");
  const [prodType, setProdType] = useState("");
  const [lotSize, setLotSize] = useState("");
  const [qtyBox, setQtyBox] = useState("");
  const [lotCode, setLotCode] = useState("");
  const [suppCode, setSuppCode] = useState("");
  const [plant, setPlant] = useState("");
  const [rcvGate, setRcvGate] = useState("");
  const [whLoc, setWhLoc] = useState("");
  const [delCycle, setDelCycle] = useState("");
  const [minBox, setMinBox] = useState("");
  const [maxBox, setMaxBox] = useState("");
  const [show, setShow] = useState(false);
  const [idUpdate, setIdUpdate] = useState("");
  const [tablePartNumber, setTablePartNumber] = useState([]);

  useEffect(() => {
    axios.get(getAllMasterPartNumberApi).then((result) => {
      setTablePartNumber(result.data.data);
    });
  }, [partNumber]);

  const handleSaveMasterPartNumber = (e) => {
    e.preventDefault();
    let data = {
      PART_NO: partNumber,
      PART_NAME: partName,
      PART_TYPE: prodType,
      LOT_SIZE: parseInt(lotSize),
      LINE_ID: parseInt(line),
      QTY_BOX: parseInt(qtyBox),
      LOT_CODE: lotCode,
      SUPP_CODE: suppCode,
      PLANT_NAME: plant,
      RCV_GATE: rcvGate,
      WH_LOC: whLoc,
      DELV_CYCLE: parseInt(delCycle),
      STD_MIN_BOX: parseInt(minBox),
      STD_MAX_BOX: parseInt(maxBox),
    };

    let confirm = window.confirm("Do you to save ?");
    if (confirm) {
      if (!idUpdate) {
        axios
          .post(createMasterPartNumberApi, data)
          .then(() => {
            window.alert("Data Send Success");
            resetForm();
          })
          .catch((error) => console.log(error));
      } else {
        data = { ...data, ID: idUpdate };
        axios
          .patch(updateMasterPartNumberApi, data)
          .then((result) => {
            console.log(result.data.data);
            resetForm("");
          })
          .catch((error) => console.log(error));
      }
    }
  };

  const resetForm = () => {
    setDelCycle("");
    setLine("");
    setLotCode("");
    setLotSize("");
    setMaxBox("");
    setMinBox("");
    setPartName("");
    setPartNumber("");
    setPlant("");
    setProdType("");
    setQtyBox("");
    setRcvGate("");
    setSuppCode("");
    setWhLoc("");
    setIdUpdate("");
  };

  const updatePartNumber = (e) => {
    const id = e.target.id;
    const data = tablePartNumber.find((value) => value.ID === parseInt(id));
    if (data) {
      setPartName(data.PART_NAME);
      setPartNumber(data.PART_NO);
      setDelCycle(data.DELV_CYCLE);
      setLine(data.LINE_ID);
      setLotSize(data.LOT_SIZE);
      setLotCode(data.LOT_CODE);
      setMaxBox(data.STD_MAX_BOX);
      setMinBox(data.STD_MIN_BOX);
      setPlant(data.PLANT_NAME);
      setProdType(data.PART_TYPE);
      setQtyBox(data.QTY_BOX);
      setRcvGate(data.RCV_GATE);
      setSuppCode(data.SUPP_CODE);
      setWhLoc(data.WH_LOC);
      setIdUpdate(id);
      setShow(true);
    }
  };
  return (
    <div style={{ marginBottom: 100 }}>
      <div style={{ textAlign: "right" }}>
        <Button appearance="primary" onClick={() => setShow(true)}>
          Register Part Number{" "}
        </Button>
      </div>

      <div className="title-section">
        <BiListCheck />
        Part Number List
      </div>
      <Table>
        <thead>
          <tr>
            <th>NO</th>
            <th>Part Number</th>
            <th>Part Name</th>
            <th>Line Name</th>
            <th>Part Type</th>
            <th>Lot Size</th>
            <th>Qty Box</th>
            <th>Supplier Code</th>
            <th>Plant Name</th>
            <th>RCV Gate</th>
            <th>WH Loc</th>
            <th>DELV_CYCLE</th>
            <th>Qty Min</th>
            <th>Qty Max</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tablePartNumber.map((value, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{value.PART_NO}</td>
                <td>{value.PART_NAME}</td>
                <td>{value.LINE_NAME}</td>
                <td>{value.PART_TYPE}</td>
                <td>{value.LOT_SIZE}</td>
                <td>{value.QTY_BOX}</td>
                <td>{value.SUPP_CODE}</td>
                <td>{value.PLANT_NAME}</td>
                <td>{value.RCV_GATE}</td>
                <td>{value.WH_LOC}</td>
                <td>{value.DELV_CYCLE}</td>
                <td>{value.STD_MIN_BOX}</td>
                <td>{value.STD_MAX_BOX}</td>
                <td>
                  <Button size="sm" id={value.ID} onClick={updatePartNumber}>
                    Update
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Register Part Number Form
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSaveMasterPartNumber}>
            <div className="box_ekanban">
              <h5 style={{ marginBottom: 5 }}>Detail Line</h5>
              <Row style={{ marginBottom: 10 }}>
                <Col lg={4}>
                  <FloatingLabel controlId="floatingSelect" label="Line">
                    <Form.Select
                      aria-label="Floating label select example"
                      value={line}
                      required
                      onChange={(e) => setLine(e.target.value)}
                    >
                      <option value="" disabled>
                        Select Product Type
                      </option>
                      <option value={1}>Line Creation Lab</option>
                    </Form.Select>
                  </FloatingLabel>
                </Col>
              </Row>
            </div>
            <div className="box_ekanban">
              <h5 style={{ margin: 5 }}>Detail Part</h5>
              <Row>
                <Col>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Part Number"
                    className="mb-3"
                  >
                    {" "}
                    <Form.Control
                      type=""
                      placeholder=""
                      value={partNumber}
                      onChange={(e) => setPartNumber(e.target.value)}
                      required
                    />
                  </FloatingLabel>
                </Col>
                <Col>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Part Name"
                    className="mb-3"
                  >
                    {" "}
                    <Form.Control
                      type=""
                      placeholder=""
                      value={partName}
                      onChange={(e) => setPartName(e.target.value)}
                      required
                    />
                  </FloatingLabel>
                </Col>
                <Col>
                  <FloatingLabel
                    controlId="floatingSelect"
                    label="Product Type"
                  >
                    <Form.Select
                      aria-label="Floating label select example"
                      value={prodType}
                      onChange={(e) => setProdType(e.target.value)}
                      required
                    >
                      <option>Pilih Tipe Produk</option>
                      <option value={CHILD_SUB_ASSY}>
                        Child Part Sub Assy
                      </option>
                      <option value={CHILD_FINAL_ASSY}>
                        Child Part Final Assy
                      </option>
                      <option value={SUB_ASSY}>Sub Assy</option>
                      <option value={FINAL_ASSY}>Final Assy</option>
                    </Form.Select>
                  </FloatingLabel>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Lot Size"
                    className="mb-3"
                  >
                    {" "}
                    <Form.Control
                      type="number"
                      placeholder=""
                      value={lotSize}
                      onChange={(e) => setLotSize(e.target.value)}
                      required
                    />
                  </FloatingLabel>
                </Col>
                <Col>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="QTY Box"
                    className="mb-3"
                  >
                    {" "}
                    <Form.Control
                      type="number"
                      placeholder=""
                      value={qtyBox}
                      onChange={(e) => setQtyBox(e.target.value)}
                      required
                    />
                  </FloatingLabel>
                </Col>
                <Col>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Lot Code"
                    className="mb-3"
                  >
                    {" "}
                    <Form.Control
                      type="text"
                      placeholder=""
                      value={lotCode}
                      onChange={(e) => setLotCode(e.target.value)}
                      required
                    />
                  </FloatingLabel>
                </Col>
              </Row>
            </div>
            <div className="box_ekanban">
              <h5 style={{ margin: 5 }}> Warehouse Data </h5>
              <Row style={{ marginBottom: 15 }}>
                <Col>
                  <FloatingLabel
                    controlId="floatingSelect"
                    label="Supplier Code"
                  >
                    <Form.Select
                      aria-label="Floating label select example"
                      value={suppCode}
                      onChange={(e) => setSuppCode(e.target.value)}
                      // required
                    >
                      <option>Select Supplier Code</option>
                      <option value={SUPPLIER_A}> Supplier A </option>
                      <option value={SUPPLIER_B}> Supplier B </option>
                      <option value={SUPPLIER_C}> Supplier C </option>
                      <option value={SUPPLIER_D}> Supplier D </option>
                    </Form.Select>
                  </FloatingLabel>
                </Col>
                <Col>
                  <FloatingLabel controlId="floatingSelect" label="Plant">
                    <Form.Select
                      aria-label="Floating label select example"
                      value={plant}
                      onChange={(e) => setPlant(e.target.value)}
                      required
                    >
                      <option>Select Plant</option>
                      <option value={FAJAR}> Fajar </option>
                      <option value={BEKASI}> Bekasi </option>
                      <option value={SUNTER}> Sunter </option>
                    </Form.Select>
                  </FloatingLabel>
                </Col>
                <Col>
                  <FloatingLabel
                    controlId="floatingSelect"
                    label="Receiving Gate"
                  >
                    <Form.Select
                      aria-label="Floating label select example"
                      value={rcvGate}
                      onChange={(e) => setRcvGate(e.target.value)}
                      required
                    >
                      <option>Select Plant</option>
                      <option value={GATE_A}> Gate A </option>
                      <option value={GATE_B}> Gate B </option>
                    </Form.Select>
                  </FloatingLabel>
                </Col>
                <Col>
                  <FloatingLabel
                    controlId="floatingSelect"
                    label="Warehose Location"
                  >
                    <Form.Select
                      aria-label="Floating label select example"
                      value={whLoc}
                      onChange={(e) => setWhLoc(e.target.value)}
                      required
                    >
                      <option>Select Plant</option>
                      <option value={WH_BAGUS}> WHBagus </option>
                      <option value={WH_TIMUR}> WH Timur </option>
                      <option value={WH_SELATAN}> WH Selatan </option>
                      <option value={WH_SIP}> WH SIP </option>
                    </Form.Select>
                  </FloatingLabel>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Delivery Cycle"
                    className="mb-3"
                  >
                    {" "}
                    <Form.Control
                      type=""
                      placeholder=""
                      value={delCycle}
                      onChange={(e) => setDelCycle(e.target.value)}
                      // required
                    />
                  </FloatingLabel>
                </Col>
                <Col>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Maximal Store"
                    className="mb-3"
                  >
                    {" "}
                    <Form.Control
                      type=""
                      placeholder=""
                      value={maxBox}
                      onChange={(e) => setMaxBox(e.target.value)}
                      required
                    />
                  </FloatingLabel>
                </Col>
                <Col>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Minimal Store"
                    className="mb-3"
                  >
                    {" "}
                    <Form.Control
                      type=""
                      placeholder=""
                      value={minBox}
                      onChange={(e) => setMinBox(e.target.value)}
                      required
                    />
                  </FloatingLabel>
                </Col>
              </Row>
            </div>
            <div className="box_ekanban">
              <Button appearance="primary" size="lg" type="submit">
                Submit
              </Button>{" "}
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MasterPartNumber;
