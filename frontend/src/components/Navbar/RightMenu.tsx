"use client";

import React from "react";
import { Menu, Avatar } from "antd";
import { UserOutlined, CodeOutlined, LogoutOutlined } from "@ant-design/icons";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import { authKey } from "@/constants/storageKey";
import { useRouter } from "next/navigation";
import Link from "next/link";

const RightMenu = ({ mode }: any) => {
  const router = useRouter();

  const logOut = () => {
    removeUserInfo(authKey);

    router.push("/login");
  };

  const { userId } = getUserInfo() as any;

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
        <Menu.Item key="profile">
          <Link href={`/profile/${userId}`}>
            <UserOutlined /> Profile
          </Link>
        </Menu.Item>
        <Menu.Item onClick={logOut} key="log-out">
          <LogoutOutlined /> Logout
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};

export default RightMenu;
