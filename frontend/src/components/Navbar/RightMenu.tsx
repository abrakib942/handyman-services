"use client";

import React from "react";
import { Menu, Avatar } from "antd";
import { UserOutlined, CodeOutlined, LogoutOutlined } from "@ant-design/icons";
import { removeUserInfo } from "@/services/auth.service";
import { authKey } from "@/constants/storageKey";
import { useRouter } from "next/navigation";

const RightMenu = ({ mode }: any) => {
  const router = useRouter();

  const logOut = () => {
    removeUserInfo(authKey);

    router.push("/login");
  };

  return (
    <Menu mode={mode}>
      <Menu.SubMenu
        title={
          <>
            <Avatar icon={<UserOutlined />} />
            {/* <span className="username">John Doe</span> */}
          </>
        }
      >
        {/* <Menu.Item key="project">
          <CodeOutlined /> Projects
        </Menu.Item> */}
        <Menu.Item key="about-us">
          <UserOutlined /> Profile
        </Menu.Item>
        <Menu.Item onClick={logOut} key="log-out">
          <LogoutOutlined /> Logout
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};

export default RightMenu;
