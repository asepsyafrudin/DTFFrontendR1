import React from "react";
import FrameDashboard from "../../Component/FrameDashboard";
import InventoryWarehouse from "../../Component/InventoryWarehouse";
import InventoryFinishGoodFinalAssy from "../../Component/InventoryFinishGoodFinalAssy";
import InventoryFinishGoodSubAssy from "../../Component/InventoryFinishGoodSubAssy";

function InventoryVisualisation() {
  return (
    <FrameDashboard>
      <InventoryWarehouse></InventoryWarehouse>
      <InventoryFinishGoodFinalAssy></InventoryFinishGoodFinalAssy>
      <InventoryFinishGoodSubAssy></InventoryFinishGoodSubAssy>
      Inventory Visualisation
    </FrameDashboard>
  );
}

export default InventoryVisualisation;
