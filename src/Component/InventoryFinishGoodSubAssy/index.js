import React from "react";
import FrameDashboard from "../FrameDashboard";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    "Part Number": "Part A",
    "Actual QTY": 1000,
    "QTY Max": 2000,
    "QTY Min": 200,
  },
  {
    "Part Number": "Part B",
    "Actual QTY": 800,
    "QTY Max": 2000,
    "QTY Min": 200,
  },
  {
    "Part Number": "Part C",
    "Actual QTY": 1500,
    "QTY Max": 2000,
    "QTY Min": 200,
  },
  {
    "Part Number": "Part D",
    "Actual QTY": 1900,
    "QTY Max": 2000,
    "QTY Min": 200,
  },
];
function InventoryFinishGoodSubAssy() {
  return (
    <ComposedChart
      width={1700}
      height={800}
      data={data}
      margin={{
        top: 20,
        right: 80,
        bottom: 20,
        left: 20,
      }}
    >
      <CartesianGrid stroke="#f5f5f5" />
      <XAxis
        dataKey="Part Number"
        label={{ value: "Pages", position: "insideBottomRight", offset: 0 }}
        scale="band"
      />
      <YAxis label={{ value: "Index", angle: -90, position: "insideLeft" }} />
      <Tooltip />
      <Legend />
      {/* <Area
            type="monotone"
            dataKey="QTY Max"
            fill="#8884d8"
            stroke="#8884d8"
          /> */}
      <Bar dataKey="Actual QTY" barSize={50} fill="#413ea0" />
      <Line type="monotone" dataKey="QTY Min" stroke="#eeff00" />
      <Line type="monotone" dataKey="QTY Max" stroke="#ff0000" />
    </ComposedChart>
  );
}

export default InventoryFinishGoodSubAssy;
