import React from "react";
import Card from "react-bootstrap/Card";
import { DataGrid } from "@mui/x-data-grid";
import { Alert, Button, AlertTitle } from "@mui/material";
import EditAttributesRoundedIcon from "@mui/icons-material/EditAttributesRounded";

function EpmEquipment() {
  const columns = [
    { field: "id", headerName: "No", width: 100 },
    { field: "equipment", headerName: "Equipment", width: 250 },
    { field: "qty", headerName: "Quantity", width: 250 },
    { field: "status", headerName: "Status", width: 250 },
    { field: "remark", headerName: "Remark", width: 250 },
  ];

  const rows = [
    {
      id: 1,
      equipment: "Snow",
      qty: "Jon",
      status: "Good",
      remark: "2",
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
          <strong>Equipment PM</strong>
          <Button
            style={{
              textTransform: "none",
            }}
            variant="contained"
            endIcon={<EditAttributesRoundedIcon />}
            color="info"
          >
            Update
          </Button>
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

export default EpmEquipment;
