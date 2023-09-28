import React from "react";
import Card from "react-bootstrap/Card";
import { DataGrid } from "@mui/x-data-grid";

function EpmMenuPm() {
  const columns = [
    { field: "id", headerName: "No", width: 100 },
    { field: "detail", headerName: "Detail", width: 250 },
    { field: "metode", headerName: "Metode", width: 250 },
    {
      field: "standard",
      headerName: "Standard",
      width: 250,
    },
    {
      field: "duration",
      headerName: "Duration",
      width: 250,
    },
    { field: "interval", headerName: "Interval", width: 250 },
    { field: "lastPm", headerName: "Last PM", width: 250 },
    { field: "nextPm", headerName: "Next PM", width: 250 },
  ];

  const rows = [
    {
      id: 1,
      detail: "Snow",
      metode: "Jon",
      standard: "Good",
      duration: "2",
      interval: "1/6M",
      lastPm: "12/12/2022",
      nextPm: "12/12/2023",
    },
  ];
  return (
    <div>
      <Card className="margin-bottom">
        <Card.Header
          style={{
            textAlign: "left",
            display: "flex",
            justifyContent: "space-between",
            fontSize: "18px",
          }}
        >
          {" "}
          <strong>Menu PM</strong>
        </Card.Header>
        <Card.Body>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        </Card.Body>
      </Card>
    </div>
  );
}

export default EpmMenuPm;
