import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, CloseButton, Col, Form, Row, Table } from "react-bootstrap";
import { BiSkipNext } from "react-icons/bi";
import { Modal } from "rsuite";
import {
  createShopListApi,
  deleteShopListByIdApi,
  getAllMasterPartNumberApi,
  getShopListAPi,
  updateShopListApi,
} from "../../Config/api";
import {
  CHILD_FINAL_ASSY,
  CHILD_SUB_ASSY,
  FINAL_ASSY,
  SUB_ASSY,
} from "../../Config/const";

function MasterShoppingList() {
  const [tablePartNumber, setTablePartNumber] = useState([]);
  const [tableShoppingList, setTableShoppingList] = useState([]);
  const [showFormMasterShopList, setShowMasterShopList] = useState(false);
  const [partNumberAssyOrSubAssy, setPartNumberAssyOrSubAssy] = useState("");
  const [qty, setQty] = useState("");
  const [idEdit, setIdEdit] = useState("");
  const [partNumberChildPart, setPartNumberChildPart] = useState("");
  const [parent, setParent] = useState("");
  const [parentPartNumber, setParentPartNumber] = useState("");
  const [action, setAction] = useState(0);

  useEffect(() => {
    axios.get(getAllMasterPartNumberApi).then((result) => {
      setTablePartNumber(result.data.data);
    });

    axios.get(getShopListAPi).then((result) => {
      setTableShoppingList(result.data.data);
    });
  }, [partNumberAssyOrSubAssy, action]);

  const handleSaveShoppingList = (e) => {
    e.preventDefault();
    let data = {
      PART_NO: partNumberAssyOrSubAssy,
      CHILD_PART_NO: partNumberChildPart,
      QTY_CHILD_PART: parseInt(qty),
    };

    if (idEdit) {
      data = { ...data, ID: idEdit };
      console.log(data);
      axios.patch(updateShopListApi, data).then((result) => {
        resetForm();
      });
    } else {
      axios.post(createShopListApi, data).then((result) => {
        resetForm();
      });
    }
  };

  const resetForm = () => {
    setPartNumberAssyOrSubAssy("");
    setQty("");
    setPartNumberChildPart("");
    setIdEdit("");
  };

  const deleteShoppingList = (e) => {
    const id = e.target.id;

    let confirm = window.confirm("Do You Want to Delete?");
    if (confirm) {
      axios.delete(deleteShopListByIdApi(id)).then((result) => {
        window.alert("Delete Data Success");
        setAction((prev) => prev + 1);
      });
    }
  };

  const setIdParent = (e) => {
    const id = e.target.id;
    const findData = tableShoppingList.find(
      (value) => value.ID === parseInt(id)
    );
    setParent(findData.PART_NO + " " + findData.PART_NAME);
    setParentPartNumber(findData.PART_NO);
  };
  const tableParent = () => {
    let table = [];
    if (tableShoppingList.length > 0) {
      const filter = tableShoppingList.filter(
        (value) =>
          value.PART_TYPE === FINAL_ASSY || value.PART_TYPE === SUB_ASSY
      );

      let secondFilter = [];
      for (let index = 0; index < filter.length; index++) {
        const checkDataInSecondFilter = secondFilter.find(
          (value) => value.PART_NO === filter[index].PART_NO
        );
        if (!checkDataInSecondFilter) {
          secondFilter.push(filter[index]);
        }
      }

      if (secondFilter.length > 0) {
        for (let index = 0; index < secondFilter.length; index++) {
          table.push(
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{secondFilter[index].PART_NO}</td>
              <td>{secondFilter[index].PART_NAME}</td>
              <td>{secondFilter[index].PART_TYPE}</td>
              <td>
                <Button
                  id={secondFilter[index].ID}
                  size="sm"
                  onClick={setIdParent}
                >
                  View Detail <BiSkipNext style={{ pointerEvents: "none" }} />
                </Button>
              </td>
            </tr>
          );
        }
      }
    }
    return table;
  };

  const functionName = (partNumber) => {
    let name = "";
    if (tablePartNumber.length > 0) {
      const data = tablePartNumber.find(
        (value) => value.PART_NO === partNumber
      );
      if (data) {
        name = data.PART_NAME;
      }
    }

    return name;
  };

  const updateShopList = (e) => {
    const id = e.target.id;
    const findData = tableShoppingList.find(
      (value) => value.ID === parseInt(id)
    );
    if (findData) {
      setPartNumberAssyOrSubAssy(findData.PART_NO);
      setPartNumberChildPart(findData.CHILD_PART_NO);
      setQty(findData.QTY_CHILD_PART);
      setShowMasterShopList(true);
      setIdEdit(id);
    }
  };
  const tableChild = () => {
    let table = [];
    if (parentPartNumber !== "") {
      const filter = tableShoppingList.filter(
        (value) => value.PART_NO === parentPartNumber
      );
      if (filter.length > 0) {
        for (let index = 0; index < filter.length; index++) {
          table.push(
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{filter[index].CHILD_PART_NO}</td>
              <td>{functionName(filter[index].CHILD_PART_NO)}</td>
              <td>{filter[index].QTY_CHILD_PART}</td>
              <td>
                <Button
                  size="sm"
                  id={filter[index].ID}
                  onClick={updateShopList}
                  variant="success"
                  style={{
                    marginRight: 10,
                  }}
                >
                  Update
                </Button>
                <Button
                  size="sm"
                  id={filter[index].ID}
                  onClick={deleteShoppingList}
                  variant="danger"
                >
                  Delete
                </Button>
              </td>
            </tr>
          );
        }
      }
    }
    return table;
  };

  const partNumberAssyOrSubAssyOption = () => {
    let option = [];
    if (tablePartNumber.length > 0) {
      const dataFilter = tablePartNumber.filter(
        (value) =>
          value.PART_TYPE === FINAL_ASSY || value.PART_TYPE === SUB_ASSY
      );
      if (dataFilter.length > 0) {
        for (let index = 0; index < dataFilter.length; index++) {
          option.push(
            <option key={index} value={dataFilter[index].PART_NO}>
              {dataFilter[index].PART_NO} - {dataFilter[index].PART_NAME}
            </option>
          );
        }
      }
      return <>{option}</>;
    }
  };

  const partNumberOption = () => {
    let option = [];
    if (tablePartNumber.length > 0 && partNumberAssyOrSubAssy !== "") {
      const dataCheck = tablePartNumber.find(
        (value) => value.PART_NO === partNumberAssyOrSubAssy
      );
      if (dataCheck.PART_TYPE === FINAL_ASSY) {
        const dataFilter1 = tablePartNumber.filter(
          (value) => value.PART_TYPE !== FINAL_ASSY
        );

        if (dataFilter1.length > 0) {
          for (let index = 0; index < dataFilter1.length; index++) {
            option.push(
              <option key={index} value={dataFilter1[index].PART_NO}>
                {dataFilter1[index].PART_NO} {"-"}{" "}
                {dataFilter1[index].PART_NAME}
              </option>
            );
          }
        }
      } else if (dataCheck.PART_TYPE === SUB_ASSY) {
        const dataFilter2 = tablePartNumber.filter(
          (value) =>
            value.PART_TYPE === CHILD_FINAL_ASSY ||
            value.PART_TYPE === CHILD_SUB_ASSY
        );
        if (dataFilter2.length > 0) {
          for (let index = 0; index < dataFilter2.length; index++) {
            option.push(
              <option key={index} value={dataFilter2[index].PART_NO}>
                {dataFilter2[index].PART_NO} {"-"}{" "}
                {dataFilter2[index].PART_NAME}
              </option>
            );
          }
        }
      }
    }

    return <>{option}</>;
  };

  return (
    <div>
      <div style={{ textAlign: "right" }}>
        <Button
          appearance="primary"
          onClick={() => setShowMasterShopList(true)}
        >
          Register Shopping List
        </Button>
      </div>
      <div className="title-section">List Master Shopping List [Parent]</div>
      <Table hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Part Number</th>
            <th>Part Name</th>
            <th>Part Type</th>
            <th>Detail View</th>
          </tr>
        </thead>
        <tbody>{tableParent()}</tbody>
      </Table>

      {parentPartNumber && (
        <>
          <div className="title-section">
            List Child of {parent}{" "}
            <CloseButton onClick={() => setParentPartNumber("")} />
          </div>
          <Table hover>
            <thead>
              <tr>
                <th>No</th>
                <th>Part Number</th>
                <th>Part Name</th>
                <th>QTY Child Part</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{tableChild()}</tbody>
          </Table>
        </>
      )}

      <Modal
        open={showFormMasterShopList}
        onClose={() => setShowMasterShopList(false)}
      >
        <Modal.Header>
          <Modal.Title>Registry Qty</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSaveShoppingList}>
          <Modal.Body>
            <Row className="mb-3" style={{ border: 1 }}>
              <Form.Group as={Col}>
                <Form.Label>Select Part Number Assy / Sub Assy</Form.Label>
                <Form.Select
                  value={partNumberAssyOrSubAssy}
                  onChange={(e) => setPartNumberAssyOrSubAssy(e.target.value)}
                  required
                >
                  <option value={""}>Select Part Number</option>
                  {partNumberAssyOrSubAssyOption()}
                </Form.Select>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col}>
                <Form.Label>Select Child Part</Form.Label>
                <Form.Select
                  value={partNumberChildPart}
                  onChange={(e) => setPartNumberChildPart(e.target.value)}
                  required
                >
                  <option value={""}>Select Part Number</option>
                  {partNumberOption()}
                </Form.Select>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col}>
                <Form.Label>Qty Child Part</Form.Label>
                <Form.Control
                  type="number"
                  onChange={(e) => setQty(e.target.value)}
                  value={qty}
                  required
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
              Save
            </Button>
            <Button
              onClick={() => {
                setShowMasterShopList(false);
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

export default MasterShoppingList;
