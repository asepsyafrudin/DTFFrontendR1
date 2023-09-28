import React from "react";
import FrameDashboard from "../../Component/FrameDashboard";
import ImageSOP from "../../Assets/SOP_TUBE.jpeg";

function SOPDX() {
  return (
    <FrameDashboard>
      <h1>SOP DX Tube Assy</h1>
      <img src={ImageSOP} alt="Gambar SOP Tube" />
    </FrameDashboard>
  );
}

export default SOPDX;
