import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import {
  createMasterProductionQtyApi,
  getAllMasterPartNumberApi,
  getMasterProductionQtyApi,
  updateMasterProductionQtyApi,
} from "../../Config/api";
import { FINAL_ASSY } from "../../Config/const";
import { Modal } from "rsuite";

function ProductionQty() {
  const [tablePartNumber, setTablePartNumber] = useState([]);
  const [tableProductionQty, setTableProductionQty] = useState([]);
  const [monthYear, setMonthYear] = useState("");
  const [partNumber, setPartNumber] = useState("");
  const [qty, setQty] = useState("");
  const [workingDay, setWorkingDay] = useState("");
  const [shift, setShift] = useState("");
  const [cycle, setCycle] = useState("");
  const [showFormRegisterQty, setShowFormRegisterQty] = useState(false);
  const [prodQtyId, setProdQtyId] = useState("");

  useEffect(() => {
    axios.get(getAllMasterPartNumberApi).then((result) => {
      const data = result.data.data;
      let dataFilter = data.filter((value) => value.PART_TYPE === FINAL_ASSY);
      setTablePartNumber(dataFilter);
    });

    axios.get(getMasterProductionQtyApi).then((result) => {
      setTableProductionQty(result.data.data);
    });
  }, [partNumber]);

  const partNumberOption = () => {
    let option = [];
    if (tablePartNumber.length > 0) {
      for (let index = 0; index < tablePartNumber.length; index++) {
        option.push(
          <option key={index} value={tablePartNumber[index].PART_NO}>
            {tablePartNumber[index].PART_NO}
          </option>
        );
      }
    }
    return <>{option}</>;
  };

  const handleSaveProdQty = (e) => {
    e.preventDefault();
    let data = {
      MONTH_YEAR: monthYear,
      WORKING_DAY: parseInt(workingDay),
      QTY: parseInt(qty),
      PART_NO: partNumber,
      SHIFT: shift,
      CYCLE: cycle,
    };

    if (prodQtyId) {
      data = { ...data, ID: prodQtyId };
      axios.patch(updateMasterProductionQtyApi, data).then((result) => {
        resetForm("");
      });
    } else {
      const checkData = tableProductionQty.find(
        (value) => value.MONTH_YEAR === monthYear
      );
      if (!checkData) {
        axios
          .post(createMasterProductionQtyApi, data)
          .then((result) => {
            resetForm("");
          })
          .catch((error) => console.log(error));
      } else {
        window.alert("Item already input");
      }
    }
  };

  const resetForm = () => {
    setMonthYear("");
    setWorkingDay("");
    setQty("");
    setPartNumber("");
    setProdQtyId("");
    setShift("");
    setCycle("");
  };

  const handleUpdateProdQty = (e) => {
    const id = e.target.id;
    const data = tableProductionQty.find((value) => value.ID === parseInt(id));
    if (data) {
      setMonthYear(data.MONTH_YEAR);
      setProdQtyId(data.ID);
      setPartNumber(data.PART_NO);
      setQty(data.QTY);
      setWorkingDay(data.WORKING_DAY);
      setShift(data.SHIFT);
      setCycle(data.CYCLE);
      setShowFormRegisterQty(true);
    }
  };
  return (
    <div>
      <div style={{ textAlign: "right" }}>
        <Button
          appearance="primary"
          onClick={() => setShowFormRegisterQty(true)}
        >
          Register Prod Qty{" "}
        </Button>
      </div>
      <div className="title-section">List Production Qty</div>
      <Table hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Part Number</th>
            <th>Part Name</th>
            <th>Month Year</th>
            <th>Total QTY</th>
            <th>Total Working Day</th>
            <th>Total SHIFT</th>
            <th>Total CYCLE</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableProductionQty.map((value, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{value.PART_NO}</td>
                <td>{value.PART_NAME}</td>
                <td>{value.MONTH_YEAR}</td>
                <td>{value.QTY.toLocaleString()}</td>
                <td>{value.WORKING_DAY}</td>
                <td>{value.SHIFT}</td>
                <td>{value.CYCLE}</td>
                <td>
                  <Button
                    variant="danger"
                    id={value.ID}
                    onClick={handleUpdateProdQty}
                  >
                    Update
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Modal
        open={showFormRegisterQty}
        onClose={() => setShowFormRegisterQty(false)}
      >
        <Modal.Header>
          <Modal.Title>Registry Qty</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSaveProdQty}>
          <Modal.Body>
            <Row className="mb-3" style={{ border: 1 }}>
              <Form.Group as={Col}>
                <Form.Label>Input Month Year</Form.Label>
                <Form.Control
                  type="month"
                  onChange={(e) => setMonthYear(e.target.value)}
                  value={monthYear}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col}>
                <Form.Label>Part Number</Form.Label>
                <Form.Select
                  value={partNumber}
                  onChange={(e) => setPartNumber(e.target.value)}
                >
                  <option value={""}>Select Part Number</option>
                  {partNumberOption()}
                </Form.Select>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col}>
                <Form.Label>Qty/Month</Form.Label>
                <Form.Control
                  type="number"
                  onChange={(e) => setQty(e.target.value)}
                  value={qty}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col}>
                <Form.Label>Total Working Day</Form.Label>
                <Form.Control
                  type="number"
                  onChange={(e) => setWorkingDay(e.target.value)}
                  value={workingDay}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col}>
                <Form.Label>Total Shift</Form.Label>
                <Form.Control
                  type="number"
                  onChange={(e) => setShift(e.target.value)}
                  value={shift}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col}>
                <Form.Label>Total Cycle</Form.Label>
                <Form.Control
                  type="number"
                  onChange={(e) => setCycle(e.target.value)}
                  value={cycle}
                />
              </Form.Group>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="submit"
              appearance="primary"
              style={{ marginRight: 5 }}
            >
              {prodQtyId ? "Update" : "Save"}
            </Button>
            <Button
              onClick={() => {
                setShowFormRegisterQty(false);
                resetForm();
              }}
              appearance="subtle"
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default ProductionQty;
