import React from "react";
import Card from "react-bootstrap/Card";
import { Alert, Button, AlertTitle } from "@mui/material";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import { PieChart, Pie, Cell, Label, Legend } from "recharts";

function EpmCharts() {
  const pmDays = [
    {
      name: "Remaining Days To Next PM",
      value: 12,
      color: "black",
    },
    {
      name: "Days",
      value: 15,
      color: "green",
    },
  ];
  const safetyStock = [
    {
      name: "Actual Qty",
      value: 300,
      color: "#fcb103",
    },
    {
      name: "Shoertfall",
      value: 100,
      color: "light gray",
    },
  ];

  return (
    <div>
      <div className="card-container">
        <div className="col-7">
          <Card className="card-pm">
            <Card.Header style={{ textAlign: "left" }}>
              {" "}
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: "20px", textTransform: "none" }}
              >
                Reschedule
              </Button>
              <Button
                variant="contained"
                style={{ textTransform: "none", backgroundColor: "#fcc603" }}
              >
                Conditional PM
              </Button>
            </Card.Header>
            <Card.Body style={{ textAlign: "center" }}>
              <Card.Title>Next PM: </Card.Title>
              <div style={{ margin: "0 auto", width: "300px" }}>
                <PieChart width={300} height={250}>
                  <Pie
                    data={pmDays}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                  >
                    {pmDays.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                    <Label
                      value="12 Days to Go"
                      position="center"
                      fontSize={14}
                      fill="#333" // Text color
                    />
                    <Legend />
                  </Pie>
                </PieChart>
              </div>
              <Button variant="contained" color="primary">
                START PM
              </Button>
            </Card.Body>
          </Card>
        </div>
        <div className="col-5">
          <Card className="card-ss">
            <Card.Header
              style={{
                textAlign: "left",
                display: "flex",
                justifyContent: "space-between",
                fontSize: "18px",
              }}
            >
              {" "}
              <strong>Safety Stock</strong>
              <Button
                style={{
                  textTransform: "none",
                }}
                endIcon={<InfoRoundedIcon />}
              ></Button>
            </Card.Header>
            <Card.Body style={{ textAlign: "center" }}>
              <div style={{ margin: "0 auto", width: "350px" }}>
                <PieChart width={350} height={250}>
                  <Pie
                    data={safetyStock}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {safetyStock.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                    <Legend />
                  </Pie>
                </PieChart>
                <Alert severity="warning" style={{ textAlign: "center" }}>
                  <AlertTitle>Warning</AlertTitle>
                  <strong>Please Complete The Safety Stock!</strong>
                </Alert>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default EpmCharts;
