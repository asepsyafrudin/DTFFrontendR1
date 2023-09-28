import React from "react";
import FrameDashboard from "../../Component/FrameDashboard";
import "./epm.css";
import EpmCharts from "../../Component/EpmCharts";
import EpmMenuPm from "../../Component/EpmMenuPm";
import EpmEquipment from "../../Component/EpmEquipment";
import EpmSparepart from "../../Component/EpmSparepart";

function EPM() {
  return (
    <FrameDashboard>
      <div>
        <div className="title-section">E-PM</div>
        <EpmCharts></EpmCharts>
        <EpmMenuPm></EpmMenuPm>
        <EpmEquipment></EpmEquipment>
        <EpmSparepart></EpmSparepart>
      </div>
    </FrameDashboard>
  );
}

export default EPM;
