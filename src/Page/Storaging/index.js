import React, { useRef, useState, useEffect } from "react";
import "./estoraging.css";
import FrameDashboard from "../../Component/FrameDashboard";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";

function Storaging() {
  const oneWayKanbanRef = useRef(null);
  const storeLocationRef = useRef(null);
  const [scanOneWayKanban, setScanOneWayKanban] = useState(true);
  const [scanStore, setScanStore] = useState(false);
  const [totalQty, setTotalQty] = useState(0);
  const [scannedQty, setScannedQty] = useState(0);
  const [expectedPartNo, setExpectedPartNo] = useState("JK446222-8491");
  const [expectedStore, setExpectedStore] = useState("SV111");
  const [expectedQty, setExpectedQty] = useState("25");
  const [unscannedKanban, setUnscannedKanban] = useState([1, 2, 3, 4, 5]);
  const [scannedKanban, setScannedKanban] = useState([]);
  const unscannedNotInScanned = unscannedKanban.filter(
    (element) => !scannedKanban.includes(element)
  );
  const combinedunscannedKanban = unscannedNotInScanned.join(",");
  const [tableColor, setTableColor] = useState("");
  const [displayTable, setDisplayTable] = useState("");

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (
        oneWayKanbanRef.current &&
        !oneWayKanbanRef.current.contains(event.target)
      ) {
        oneWayKanbanRef.current.focus();
      } else if (
        storeLocationRef.current &&
        !storeLocationRef.current.contains(event.target)
      ) {
        storeLocationRef.current.focus();
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const isValueInScannedKanban = (valueToCheck) => {
    return scannedKanban.includes(valueToCheck);
  };

  const scannedOneWayKanban = (event) => {
    event.preventDefault();
    const scannedOneWayKanban = oneWayKanbanRef.current.value;
    const scannedPartNo = scannedOneWayKanban.substring(0, 15);
    const scannedQty = scannedOneWayKanban.substring(15, 22);
    const scannedSequence = parseInt(scannedOneWayKanban.substring(27, 30));
    if (scannedOneWayKanban.length === 30) {
      if (scannedPartNo.trim() === expectedPartNo) {
        if (isValueInScannedKanban(scannedSequence)) {
          alert("Part Number Duplicate!");
          oneWayKanbanRef.current.value = "";
        } else {
          setScanOneWayKanban(false);
          setScanStore(true);
          setTimeout(() => {
            storeLocationRef.current.focus();
          }, 0);
          setScannedKanban([...scannedKanban, scannedSequence]);
          setTotalQty((prevQty) => prevQty + parseFloat(scannedQty || 0));
          setTableColor("#FFE17F");
        }
      } else {
        alert("Part Number does not match the expected value!");
        oneWayKanbanRef.current.value = "";
      }
    } else {
      alert("Not QR Part Number!");
      oneWayKanbanRef.current.value = "";
    }
  };

  const scannedStore = (event) => {
    event.preventDefault();
    const scannedStore = storeLocationRef.current.value;

    if (scannedStore.length === 5) {
      if (scannedStore === expectedStore) {
        setScanOneWayKanban(true);
        setScanStore(false);
        setTimeout(() => {
          oneWayKanbanRef.current.focus();
        }, 0);
        setScannedQty(totalQty);

        if (totalQty == expectedQty) {
          setDisplayTable("none");
        }
      } else {
        alert("Store location does not match the expected value!");
        storeLocationRef.current.value = "";
      }
    } else {
      alert("Not QR Store!");
      storeLocationRef.current.value = "";
    }
  };

  return (
    <FrameDashboard>
      <div>
        <div className="title-section">E-Storaging</div>
        <h5
          style={{ textAlign: "left", marginBottom: "20px", marginTop: "20px" }}
        >
          A-Notice: <Badge bg="secondary">A2023092611</Badge>
        </h5>
        {scanOneWayKanban && (
          <Form onSubmit={(event) => scannedOneWayKanban(event)}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                ref={oneWayKanbanRef}
                placeholder="Scan One Way Kanban"
              />
            </Form.Group>
          </Form>
        )}
        {scanStore && (
          <Form onSubmit={(event) => scannedStore(event)}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                ref={storeLocationRef}
                placeholder="Scan Store Location"
              />
            </Form.Group>
          </Form>
        )}
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Part Number</th>
              <th>Store Location</th>
              <th>Qty</th>
              <th>Unscanned Kanban</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ backgroundColor: tableColor, display: displayTable }}>
              <td>1</td>
              <td>{expectedPartNo}</td>
              <td>{expectedStore}</td>
              <td>{`${scannedQty}/${expectedQty}`}</td>
              <td>{combinedunscannedKanban}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </FrameDashboard>
  );
}

export default Storaging;
