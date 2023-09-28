// import { UserBadge } from "@rsuite/icons";
import React from "react";
import { Navbar, Nav } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import "./header.css";
import { Input, InputGroup, Avatar } from "rsuite";

function Header() {
  return (
    <div>
      <Navbar className="header-all">
        <Navbar.Brand style={{ color: "white" }}>
          DIGITAL TWIN FACTORY
        </Navbar.Brand>
        <Nav pullRight>
          <Nav.Item>
            <InputGroup inside style={{ width: 300 }}>
              <Input />
              <InputGroup.Button>
                <SearchIcon />
              </InputGroup.Button>
            </InputGroup>
          </Nav.Item>
          <Nav.Item>
            <Avatar
              circle
              src="https://avatars.githubusercontent.com/u/15609339"
              alt="@hiyangguo"
            />
          </Nav.Item>
        </Nav>
      </Navbar>
    </div>
  );
}

export default Header;
