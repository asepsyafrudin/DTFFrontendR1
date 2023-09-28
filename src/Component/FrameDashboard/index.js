import React, { Children } from "react";
import Header from "../Header";

import { Container, Sidebar, Sidenav, Content, Navbar, Nav } from "rsuite";
import CogIcon from "@rsuite/icons/legacy/Cog";
import AngleLeftIcon from "@rsuite/icons/legacy/AngleLeft";
import AngleRightIcon from "@rsuite/icons/legacy/AngleRight";
import DashboardIcon from "@rsuite/icons/Dashboard";
import GroupIcon from "@rsuite/icons/legacy/Group";
import MagicIcon from "@rsuite/icons/legacy/Magic";
import { useNavigate } from "react-router-dom";

const headerStyles = {
  padding: 18,
  fontSize: 16,
  height: 56,
  background: "#020025",
  color: " #fff",
  whiteSpace: "nowrap",
  overflow: "hidden",
};

const NavToggle = ({ expand, onChange }) => {
  return (
    <Navbar appearance="subtle" className="nav-toggle">
      <Nav>
        <Nav.Menu
          noCaret
          placement="topStart"
          trigger="click"
          title={<CogIcon style={{ width: 20, height: 20 }} size="sm" />}
        >
          <Nav.Item>Help</Nav.Item>
          <Nav.Item>Settings</Nav.Item>
          <Nav.Item>Sign out</Nav.Item>
        </Nav.Menu>
      </Nav>

      <Nav pullRight>
        <Nav.Item onClick={onChange} style={{ width: 56, textAlign: "center" }}>
          {expand ? <AngleLeftIcon /> : <AngleRightIcon />}
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

const FrameDashboard = ({ children }) => {
  const [expand, setExpand] = React.useState(false);
  const navigate = useNavigate();

  const changePage = (page) => {
    navigate(page);
  };
  return (
    <div className="show-fake-browser sidebar-page">
      <Container>
        <Sidebar
          style={{ display: "flex", flexDirection: "column" }}
          width={expand ? 260 : 56}
          collapsible
        >
          <Sidenav.Header>
            <div style={headerStyles}>
              <span>DX</span>
            </div>
          </Sidenav.Header>
          <Sidenav
            expanded={expand}
            defaultOpenKeys={["3"]}
            appearance="subtle"
          >
            <Sidenav.Body style={{ textAlign: "left" }}>
              <Nav>
                <Nav.Item
                  eventKey="1"
                  active
                  icon={<DashboardIcon style={{ pointerEvents: "none" }} />}
                  onClick={() => changePage("/dashboard")}
                >
                  Dashboard
                </Nav.Item>
                <Nav.Menu
                  eventKey="2"
                  trigger="hover"
                  title="Production Planning"
                  icon={<MagicIcon />}
                  placement="rightStart"
                >
                  <Nav.Item
                    eventKey="2-1"
                    onClick={() => changePage("/e-kanban")}
                  >
                    E-kanban
                  </Nav.Item>
                  <Nav.Item
                    eventKey="2-2"
                    onClick={() => changePage("/e-staging")}
                  >
                    E-Staging
                  </Nav.Item>
                  <Nav.Item
                    eventKey="2-3"
                    onClick={() => {
                      changePage("/e-inventory");
                    }}
                  >
                    E-Inventory
                  </Nav.Item>
                  <Nav.Item
                    eventKey="2-4"
                    name={"e-receiving"}
                    onClick={() => changePage("/e-receiving")}
                  >
                    E-Receiving
                  </Nav.Item>
                  <Nav.Item eventKey="2-5" onClick={() => changePage("/e-ro")}>
                    E-RO
                  </Nav.Item>
                </Nav.Menu>
                <Nav.Menu
                  eventKey="3"
                  trigger="hover"
                  title="Production"
                  icon={<MagicIcon />}
                  placement="rightStart"
                >
                  <Nav.Item eventKey="3-1">E-Dekidaka</Nav.Item>
                  <Nav.Item
                    eventKey="3-2"
                    name="leadercontrol"
                    onClick={() => changePage("/leadercontrol")}
                  >
                    Leader Control
                  </Nav.Item>
                  <Nav.Item
                    eventKey="3-3"
                    name="agvcontrol"
                    onClick={() => changePage("/agvcontrol")}
                  >
                    AGV Control
                  </Nav.Item>
                  <Nav.Item
                    eventKey="3-4"
                    name="sopdx"
                    onClick={() => changePage("/sopdx")}
                  >
                    SOP DX
                  </Nav.Item>
                  <Nav.Item
                    eventKey="3-5"
                    name="traceability"
                    onClick={() => changePage("/e-traceability")}
                  >
                    Traceability
                  </Nav.Item>
                </Nav.Menu>
                <Nav.Item eventKey="4" icon={<GroupIcon />}>
                  Maintenace E-PM
                </Nav.Item>
                <Nav.Item
                  eventKey="4"
                  icon={<GroupIcon />}
                  name="e-energy"
                  onClick={() => changePage("/e-energy")}
                >
                  Energy Control
                </Nav.Item>
              </Nav>
            </Sidenav.Body>
          </Sidenav>
          <NavToggle expand={expand} onChange={() => setExpand(!expand)} />
        </Sidebar>
        <Container>
          <Header />
          <Content>
            {Children.map(children, (child) => (
              <div className="Row">{child}</div>
            ))}
          </Content>
        </Container>
      </Container>
    </div>
  );
};

export default FrameDashboard;
