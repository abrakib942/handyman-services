"use client";

import React, { useEffect, useState } from "react";
import { Layout, Button, Drawer } from "antd";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import { MenuOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { usePathname } from "next/navigation";

import "./navbar.css";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(!visible);
  };

  // If you do not want to auto-close the mobile drawer when a path is selected
  // Delete or comment out the code block below
  // From here
  const pathname = usePathname();
  useEffect(() => {
    setVisible(false);
  }, [pathname]);
  // Upto here

  return (
    <nav className="navbar">
      <Layout>
        <Layout.Header
          style={{
            backgroundColor: "white",
          }}
          className="nav-header"
        >
          <div className="navbar-menu">
            <div
              style={{
                marginRight: "10px",
                display: "flex",
                fontWeight: "bold",
                fontSize: "large",
              }}
            >
              <div>
                <Button className="menuButton" type="text" onClick={showDrawer}>
                  <MenuOutlined />
                </Button>
              </div>
              <div className="logo">Handyman Services</div>
            </div>

            <div className="leftMenu">
              <LeftMenu mode={"horizontal"} />
            </div>

            <div
              style={{
                marginRight: "10px",
                display: "flex",
              }}
              className="rightMenu"
            >
              <RightMenu mode={"horizontal"} />
              <div>
                <ShoppingCartOutlined
                  style={{
                    fontSize: "25px",
                    marginTop: "20px",
                    color: "black",
                  }}
                />
              </div>
            </div>

            <Drawer
              title={"Handyman Services"}
              placement="left"
              closable={true}
              onClose={showDrawer}
              open={visible}
              style={{ zIndex: 9999 }}
            >
              <LeftMenu mode={"inline"} />
              <RightMenu mode={"inline"} />
            </Drawer>
          </div>
        </Layout.Header>
      </Layout>
    </nav>
  );
};

export default Navbar;
