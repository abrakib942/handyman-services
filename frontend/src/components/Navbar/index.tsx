"use client";

import React, { useEffect, useState } from "react";
import { Layout, Button, Drawer } from "antd";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import { MenuOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { usePathname } from "next/navigation";

import "./navbar.css";
import CustomButton from "../ui/CustomButton";
import { isLoggedIn } from "@/services/auth.service";
import Link from "next/link";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(!visible);
  };

  const userLoggedIn = isLoggedIn();

  const pathname = usePathname();
  useEffect(() => {
    setVisible(false);
  }, [pathname]);
  // Upto here

  return (
    <div className="navbar">
      <div className=" py-2 lg:px-5">
        <div className="flex justify-evenly ">
          <div
            style={{
              marginRight: "10px",
              display: "flex",
              alignItems: "center",
              fontWeight: "bold",
              fontSize: "large",
            }}
          >
            <div>
              <Button className="menuButton" type="text" onClick={showDrawer}>
                <MenuOutlined />
              </Button>
            </div>
            <div className="  ">Handyman Services</div>
          </div>

          <div className="leftMenu">
            <LeftMenu mode={"horizontal"} />
          </div>
          <div className="">
            {userLoggedIn ? (
              <div
                style={{
                  marginRight: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
                className=""
              >
                <div>
                  <ShoppingCartOutlined
                    style={{
                      fontSize: "25px",
                      marginTop: "10px",
                      color: "black",
                    }}
                  />
                </div>
                <RightMenu mode={"horizontal"} />
              </div>
            ) : (
              <Link href="/signup">
                <CustomButton>Sign Up</CustomButton>
              </Link>
            )}
          </div>

          <div>
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
        </div>
      </div>
    </div>
  );
};

export default Navbar;
