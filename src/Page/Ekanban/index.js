import React, { useState } from "react";
import FrameDashboard from "../../Component/FrameDashboard";
import Footer from "../../Component/Footer/Index";

import "./ekanban.css";
import MasterPartNumber from "../../Component/MasterPartNumber";
import { Tab, Tabs } from "react-bootstrap";
import MasterLine from "../../Component/MasterLine";
import ProductionQty from "../../Component/ProductionQty";
import MasterShoppingList from "../../Component/MasterShoppingList";

// function FormMasterEKanban() {
//   const [validated, setValidated] = useState(false);

//   const handleSubmit = (event) => {
//     const form = event.currentTarget;
//     if (form.checkValidity() === false) {
//       event.preventDefault();
//       event.stopPropagation();
//     }

//     setValidated(true);
//   };

function Ekanban() {
  const [key, setKey] = useState("home");

  return (
    <div>
      <FrameDashboard>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="home" title="Master Part Number">
            <MasterPartNumber />
          </Tab>
          <Tab eventKey="line" title="Master Line">
            <MasterLine />
          </Tab>
          <Tab eventKey="profile" title="Production Quantity">
            <ProductionQty />
          </Tab>
          <Tab eventKey="contact" title="Master Shopping List">
            <MasterShoppingList />
          </Tab>
        </Tabs>
        <Footer />
      </FrameDashboard>
    </div>
  );
}

export default Ekanban;
