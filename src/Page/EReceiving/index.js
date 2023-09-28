import React, { useRef, useState, useEffect } from "react";
import FrameDashboard from "../../Component/FrameDashboard";
import Webcam from "react-webcam";
import Tesseract from "tesseract.js";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import axios from "axios";
import {
  createTransactionReceivingApi,
  getTransactionReceivingApi,
  getTransactionReceivingBySjcodeApi,
} from "../../Config/api";
import "./ereceiving.css";

function EReceiving() {
  const webcamRef = useRef(null);
  const inputRef = useRef(null);
  const [captureOcr, setCaptureOcr] = useState(1);
  const [capturedImage, setCapturedImage] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [showInputBox, setInputBox] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [captureOcrLot, setCaptureOcrLot] = useState("");
  const [capturedImageLot, setCapturedImageLot] = useState(null);
  const [extractedTextLot, setExtractedTextLot] = useState("");
  const [tableSjcode, setTableSjcode] = useState([]);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);

    processImageWithTesseract(imageSrc);
  };

  const captureLot = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImageLot(imageSrc);

    processImageWithTesseractLot(imageSrc);
  };

  const processImageWithTesseract = async (imageSrc) => {
    try {
      const {
        data: { text },
      } = await Tesseract.recognize(imageSrc, "eng");
      //PUT PROGRAM TO GET ONLY THE NUMERICAL VALUE
      const numericalValues = text.match(/\d+(\.\d+)?/g);
      setExtractedText(numericalValues);
    } catch (error) {
      console.error("Error processing image with Tesseract:", error);
    }
  };

  const processImageWithTesseractLot = async (imageSrc) => {
    try {
      const {
        data: { text },
      } = await Tesseract.recognize(imageSrc, "eng");
      setExtractedTextLot(text);
    } catch (error) {
      console.error("Error processing image with Tesseract:", error);
    }
  };

  const handleSubmitData = () => {
    if (extractedText) {
      const encodedText = encodeURIComponent(extractedText);
      axios
        .get(getTransactionReceivingBySjcodeApi(encodedText))
        .then((result) => {
          console.log(result.data.data[0]);
          const SJ_CODE = result.data.data.SJ_CODE;
          const PART_NO = result.data.data.PART_NO;
          if (tableData.length === 1) {
            tableData[0].sjCode = SJ_CODE;
            tableData[0].partNo = PART_NO;
          }
        });

      const newData = { text: extractedText };
      setTableData([...tableData, newData]);
      console.log(tableData);
      setShowTable(true);
      setInputBox(true);
      setExtractedText("");
      setCapturedImage("");
      setCaptureOcr("");

      const data = {
        SJ_CODE: extractedText,
      };

      axios
        .post(createTransactionReceivingApi, data)
        .then((response) => {
          console.log(response.data);
          window.alert("Data Sent Successfully");
        })
        .catch((error) => {
          console.log(data);
          console.error("Error:", error);
          window.alert("Error sending data. Please try again.");
        });
    }
  };

  // useEffect(() => {
  //   axios.get(getTransactionReceivingBySjcodeApi).then((result) => {
  //     // setTableData(result.data.data);
  //     console.log(result);
  //   });
  // }, [extractedText]);

  const handleSubmitDataLot = () => {
    if (extractedTextLot) {
      //need to change the data to total scanned kanban qty
      const combinedSupplierLots = tableData
        .map((data) => data.supplierLot)
        .concat(extractedTextLot)
        .join(", ");
      if (tableData.length === 1) {
        tableData[0].supplierLot = combinedSupplierLots;
      }
      setShowTable(true);
      setInputBox(true);
      setExtractedTextLot("");
      setCapturedImageLot("");
      setCaptureOcrLot("");
    }
  };

  const showOcrLot = () => {
    setInputBox("");
    setCaptureOcrLot(true);
  };

  const styleInputBox = {
    marginTop: "10px",
  };

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (
        showTable &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        inputRef.current.focus();
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [showTable]);

  const handleFinish = () => {
    const generatedNumber = generateNumber();
    if (tableData.length === 1) {
      const updatedTableData = [...tableData];
      updatedTableData[0].aNotice = generatedNumber;
      setTableData(updatedTableData);
    }
  };

  const generateNumber = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const formattedDate = `${year}${month.toString().padStart(2, "0")}${day
      .toString()
      .padStart(2, "0")}`;
    return `A${formattedDate}`;
  };

  return (
    <FrameDashboard>
      <div>
        <div className="title-section">E-Receiving</div>
        {captureOcr && (
          <div>
            <h3>Capture Delivery Sheet Number</h3>
            <div>
              <Webcam
                height="200"
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
              />
            </div>
            <Button onClick={capture} variant="primary">
              Capture
            </Button>
          </div>
        )}

        {capturedImage && (
          <div>
            <h3>Captured Image:</h3>
            <img height="200" src={capturedImage} alt="Captured" />
          </div>
        )}
        {extractedText && (
          <div>
            <h3>Extracted Text:</h3>
            <p>{extractedText}</p>
            <Button onClick={handleSubmitData} variant="primary">
              Submit Data
            </Button>
          </div>
        )}

        {captureOcrLot && (
          <div>
            <h3>Capture Supplier Lot</h3>
            <div>
              <Webcam
                height="200"
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
              />
            </div>
            <Button onClick={captureLot} variant="primary">
              Capture
            </Button>
          </div>
        )}

        {capturedImageLot && (
          <div>
            <h3>Captured Image:</h3>
            <img height="200" src={capturedImageLot} alt="Captured" />
          </div>
        )}
        {extractedTextLot && (
          <div>
            <h3>Extracted Text:</h3>
            <p>{extractedTextLot}</p>
            <Button onClick={handleSubmitDataLot} variant="primary">
              Submit Data
            </Button>
          </div>
        )}

        {showTable && (
          <div>
            <h3>Delivery Sheet Data</h3>
            {showInputBox && (
              <Form onSubmit={showOcrLot} style={styleInputBox}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    type="text"
                    ref={inputRef}
                    placeholder="Scan One Way Kanban"
                  />
                </Form.Group>
              </Form>
            )}
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Delivery Sheet No</th>
                  <th>Part Number</th>
                  <th>QTY Total/Box Plan</th>
                  <th>QTY Total/Box Actual</th>
                  <th>Scanned Kanban</th>
                  <th>Supplier Lot</th>
                  <th>A Notice</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.sjCode}</td>
                    <td>{data.partNo}</td>
                    <td>10/5</td>
                    <td>10/5</td>
                    <td>1,2,3,4,5</td>
                    <td>{data.supplierLot}</td>
                    <td>{data.aNotice}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Button onClick={handleFinish} variant="danger">
              Finish
            </Button>
          </div>
        )}
      </div>
    </FrameDashboard>
  );
}

export default EReceiving;
