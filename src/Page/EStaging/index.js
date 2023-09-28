import React, { useEffect, useState } from "react";
import FrameDashboard from "../../Component/FrameDashboard";
import CardDate from "../../Component/CardDate";
import "./estaging.css";
import { Col, Form, Row, Table, Button, Badge } from "react-bootstrap";
import axios from "axios";
import {
  createTransactionDetailPullingApi,
  createTransactionPullingApi,
  getAllMasterPartNumberApi,
  getMasterProductionQtyApi,
  getTransactionDetailPullingByIdApi,
  getTransactionPullingApi,
} from "../../Config/api";
import moment from "moment";
import { FINAL_ASSY } from "../../Config/const";
import { Modal } from "rsuite";

function EStaging() {
  const [productionQty, setProductionQty] = useState([]);
  const [date, setDate] = useState("");
  const [shift, setShift] = useState("");
  const [partNumber, setPartNumber] = useState("");
  const [partName, setPartName] = useState("");
  const [tablePartNumber, setTablePartNumber] = useState([]);
  const [tablePulling, setTablePulling] = useState([]);
  const [idPulling, setIdPulling] = useState("");
  const [timePulling, setTimePulling] = useState("");
  const [open, setOpen] = useState(false);
  const [innerTag, setInnerTag] = useState("");
  const [lotSize, setLotSize] = useState("");
  const [qtyBox, setQtyBox] = useState("");
  const [totalScanned, setTotalScanned] = useState(0);
  const [tableDetailPulling, setTableDetailPulling] = useState([]);
  const [action, setAction] = useState("");

  const handleClose = () => setOpen(false);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    axios
      .get(getMasterProductionQtyApi, {
        signal: controller.signal,
      })
      .then((result) => {
        mounted && setProductionQty(result.data.data);
      })
      .catch((error) => console.log(error));

    axios
      .get(getAllMasterPartNumberApi)
      .then((result) => {
        mounted && setTablePartNumber(result.data.data);
      })
      .catch((error) => console.log(error));

    if (idPulling) {
      axios
        .get(getTransactionDetailPullingByIdApi(idPulling))
        .then((result) => {
          setTableDetailPulling(result.data.data);
          console.log(result.data.data);
          const data = result.data.data;
          let total = 0;
          if (data.length > 0) {
            for (let index = 0; index < data.length; index++) {
              total += parseInt(data[index].QTY);
            }
          }
          setTotalScanned(total);
        });
    }
  }, [idPulling, action, innerTag]);

  const generateHeijunka = async (e) => {
    e.preventDefault();
    const dataForAPi = {
      PART_NO: partNumber,
      DATE: date,
      SHIFT: shift,
    };
    const result = await axios.post(getTransactionPullingApi, dataForAPi);
    setTablePulling(result.data.data);
    setPartName(result.data.data[0].PART_NAME);
    if (result.data.data.length === 0) {
      const productionSetting = productionQty.filter(
        (value) =>
          new Date(value.MONTH_YEAR).getMonth() === moment(date).month() &&
          new Date(value.MONTH_YEAR).getFullYear() === moment(date).year()
      );

      if (productionSetting.length > 0) {
        const checkDataProduction = productionSetting.find(
          (value) => value.PART_NO === partNumber
        );
        if (checkDataProduction) {
          if (shift === 1) {
            const pullingTimeInterval = Math.floor(
              (8 / checkDataProduction.CYCLE) * 60
            );
            let setDate = new Date();
            setDate.setHours(7);
            setDate.setMinutes(30);
            let tableData = [];

            for (let index = 0; index < checkDataProduction.CYCLE; index++) {
              const data = {
                TIME_START:
                  setDate.getHours() === 12
                    ? moment(setDate.setHours(setDate.getHours() + 1)).format(
                        "LT"
                      )
                    : moment(
                        setDate.setMinutes(
                          setDate.getMinutes() + pullingTimeInterval
                        )
                      ).format("LT"),
                PART_NO: partNumber,
                DATE: date,
                SHIFT: shift,
                STATUS: "OPEN",
              };

              tableData.push(data);
            }

            if (tableData.length > 0) {
              for (let index = 0; index < tableData.length; index++) {
                axios.post(createTransactionPullingApi, tableData[index]);
              }
            }
          } else if (shift === 2) {
            const pullingTimeInterval = Math.floor(
              (8 / checkDataProduction.CYCLE) * 60
            );
            let setDate = new Date();
            setDate.setHours(9);
            setDate.setMinutes(0);
            let tableData = [];

            for (let index = 0; index < checkDataProduction.CYCLE; index++) {
              const data = {
                TIME_START:
                  setDate.getHours() === 12
                    ? moment(setDate.setHours(setDate.getHours() + 1)).format(
                        "LT"
                      )
                    : moment(
                        setDate.setMinutes(
                          setDate.getMinutes() + pullingTimeInterval
                        )
                      ).format("LT"),
                PART_NO: partNumber,
                DATE: date,
                SHIFT: shift,
                STATUS: "OPEN",
              };

              tableData.push(data);
            }

            if (tableData.length > 0) {
              for (let index = 0; index < tableData.length; index++) {
                axios.post(createTransactionPullingApi, tableData[index]);
              }
            }
          }
        }
      }
    }
  };

  const partNumberFinalAssy = () => {
    let table = [];
    if (tablePartNumber.length > 0) {
      const filter = tablePartNumber.filter(
        (value) => value.PART_TYPE === FINAL_ASSY
      );
      if (filter.length > 0) {
        for (let index = 0; index < filter.length; index++) {
          table.push(
            <option key={index} value={filter[index].PART_NO}>
              {filter[index].PART_NO} - {filter[index].PART_NAME}
            </option>
          );
        }
      }
    }
    return table;
  };

  const disabledPulling = (startTime) => {
    const time = new Date();
    const startTimePulling = new Date().setTime(startTime);

    console.log(startTimePulling);
  };
  const statusPulling = (timeStart, Status) => {};

  const handlePulling = (e) => {
    setIdPulling(e.target.id);
    const dataPulling = tablePulling.find(
      (value) => value.ID === parseInt(e.target.id)
    );
    if (dataPulling) {
      setPartName(dataPulling.PART_NAME);
      setTimePulling(dataPulling.TIME_START);
      setLotSize(dataPulling.LOT_SIZE);
      setQtyBox(dataPulling.QTY_BOX);
    }
    setOpen(true);
  };

  const handleDetailPulling = (e) => {
    e.preventDefault();
    const partNumberMasterdata = tablePartNumber.find(
      (value) => value.PART_NO === partNumber
    );

    if (totalScanned >= lotSize * qtyBox) {
      window.alert("Pick up Already Complete");
    } else {
      const dataSend = {
        PULLING_ID: parseInt(idPulling),
        INNER_TAG: innerTag,
        QTY: partNumberMasterdata.QTY_BOX,
      };

      axios
        .post(createTransactionDetailPullingApi, dataSend)
        .then((result) => {
          setAction(action + 1);
          setInnerTag("");
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div>
      <FrameDashboard>
        <div
          style={{
            padding: 20,
            display: "flex",
            justifyContent: "center",
            flexFlow: "row",
          }}
        ></div>
        <CardDate />
        <div className="heijunka-title">Heijunka</div>
        <Form onSubmit={generateHeijunka}>
          <Row style={{ textAlign: "left" }}>
            <Form.Group as={Col}>
              <Form.Label>Select Part Number</Form.Label>
              <Form.Select
                required
                onChange={(e) => setPartNumber(e.target.value)}
                value={partNumber}
              >
                <option value="" disabled>
                  {" "}
                  Choose Part Number
                </option>
                {partNumberFinalAssy()}
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Select Date</Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Shift</Form.Label>
              <Form.Select
                required
                value={shift}
                onChange={(e) => setShift(e.target.value)}
              >
                <option value="" disabled>
                  {" "}
                  Choose Shift
                </option>
                <option value={1}>Shift 1</option>
                <option value={2}>Shift 2</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <Row style={{ textAlign: "left", marginTop: 10 }}>
            <Col>
              <Button variant="primary" size="sm" type="submit">
                Generate
              </Button>
            </Col>
          </Row>
        </Form>

        <Table hover>
          <thead>
            <tr>
              <th rowSpan={2}>No</th>
              <th rowSpan={2}>Date</th>
              <th colSpan={3}>Cycle Pulling Time (Minutes)</th>
              <th rowSpan={2}>Part Number</th>
              <th rowSpan={2}>Part Name</th>
              <th rowSpan={2}>Lot Size</th>
              <th rowSpan={2}>Status</th>
              <th rowSpan={2}>Action</th>
            </tr>
            <tr>
              <th>Time Start</th>
              <th>Actual Time Finish</th>
              <th>Total Time </th>
            </tr>
          </thead>
          <tbody>
            {tablePulling.map((value, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{moment(value.DATE).format("LL")}</td>
                  <td>{value.TIME_START}</td>
                  <td></td>
                  <td></td>
                  <td>{value.PART_NO}</td>
                  <td>{value.PART_NAME}</td>
                  <td>{value.LOT_SIZE}</td>
                  <td>
                    <Badge bg="primary">{value.STATUS}</Badge>
                  </td>
                  <td>
                    <Button
                      variant="primary"
                      size="sm"
                      type="submit"
                      id={value.ID}
                      onClick={handlePulling}
                    >
                      Open For Pulling
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Modal open={open} onClose={handleClose}>
          <Modal.Header>
            <Modal.Title style={{ fontSize: 20, fontWeight: "bold" }}>
              Pulling
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="mb-5">
              <Col lg={6}>
                <Row>
                  <Col>Part Number </Col>
                  <Col>{partNumber}</Col>
                </Row>
                <Row>
                  <Col>Part Name</Col>
                  <Col>{partName}</Col>
                </Row>
                <Row>
                  <Col>Pulling Time</Col>
                  <Col>{timePulling}</Col>
                </Row>
                <Row>
                  <Col>Lot Size (box)</Col>
                  <Col>{lotSize}</Col>
                </Row>
                <Row>
                  <Col>Total QTY (Pcs)</Col>
                  <Col>{lotSize * qtyBox}</Col>
                </Row>
              </Col>
              <Col lg={6}>
                <Badge bg="primary" style={{ height: 100, fontSize: 50 }}>
                  {totalScanned}/{qtyBox * lotSize}
                </Badge>
              </Col>
            </Row>

            <Form onSubmit={handleDetailPulling}>
              <Form.Group as={Col}>
                <Form.Label>Input By Scanner Inner Tag</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inner Tag"
                  onChange={(e) => setInnerTag(e.target.value)}
                  value={innerTag}
                />
              </Form.Group>
              <div style={{ textAlign: "right", marginTop: 5 }}>
                <Button size="sm" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
            <div>Detail Pulling Transaction</div>
            <Table hover bordered>
              <thead>
                <tr>
                  <th>NO</th>
                  <th>Inner Tag ID</th>
                  <th>Qty</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {tableDetailPulling.map((value, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{value.INNER_TAG}</td>
                      <td>{value.QTY}</td>
                      <td>{moment(value.TIME).format("lll")}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleClose} appearance="primary">
              Ok
            </Button>
            <Button onClick={handleClose} appearance="subtle">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </FrameDashboard>
    </div>
  );
}

export default EStaging;
