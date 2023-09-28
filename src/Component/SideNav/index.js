import React, { useState } from "react";
import { Nav, Sidenav, Toggle } from "rsuite";
import { BiGroup, BiSolidDashboard } from "react-icons/bi";
import { HiCamera } from "react-icons/hi";

function SideNav() {
  const [expanded, setExpanded] = useState(true);
  const [activeKey, setActiveKey] = useState("1");

  const panelStyles = {
    padding: "15px 20px",
    color: "#aaa",
  };

  const headerStyles = {
    padding: 20,
    fontSize: 16,
    background: "#34c3ff",
    color: " #fff",
  };

  return (
    <div style={{ width: 240, ...panelStyles }}>
      <Toggle
        onChange={setExpanded}
        checked={expanded}
        checkedChildren="Expand"
        unCheckedChildren="Collapse"
      />
      <hr />
      <Sidenav expanded={expanded} defaultOpenKeys={["3", "4"]}>
        <Sidenav.Body>
          <Nav activeKey={activeKey} onSelect={setActiveKey}>
            <Nav.Item eventKey="1" icon={<BiSolidDashboard />}>
              Dashboard
            </Nav.Item>
            <Nav.Item eventKey="2" icon={<BiGroup />}>
              User Group
            </Nav.Item>
            <Nav.Menu
              placement="rightStart"
              eventKey="3"
              title="Advanced"
              icon={<BiSolidDashboard />}
            >
              <Nav.Item eventKey="3-1">Geo</Nav.Item>
              <Nav.Item eventKey="3-2">Devices</Nav.Item>
              <Nav.Item eventKey="3-3">Loyalty</Nav.Item>
              <Nav.Item eventKey="3-4">Visit Depth</Nav.Item>
            </Nav.Menu>
            <Nav.Menu
              placement="rightStart"
              eventKey="4"
              title="Settings"
              icon={<HiCamera />}
            >
              <Nav.Item eventKey="4-1">Applications</Nav.Item>
              <Nav.Item eventKey="4-2">Channels</Nav.Item>
              <Nav.Item eventKey="4-3">Versions</Nav.Item>
              <Nav.Menu eventKey="4-5" title="Custom Action">
                <Nav.Item eventKey="4-5-1">Action Name</Nav.Item>
                <Nav.Item eventKey="4-5-2">Action Params</Nav.Item>
              </Nav.Menu>
            </Nav.Menu>
          </Nav>
        </Sidenav.Body>
        <Sidenav.Toggle
          expanded={expanded}
          onToggle={(expanded) => setExpanded(expanded)}
        />
      </Sidenav>
    </div>
  );
}

export default SideNav;
