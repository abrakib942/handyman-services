"use client";

import { getUserInfo } from "@/services/auth.service";
import { Layout, Menu } from "antd";
import { useState } from "react";
import { sidebarItems } from "./sidebarItems";

const { Sider } = Layout;

const DashboardSide = () => {
  const [collapsed, setCollapsed] = useState(false);

  // const role = USER_ROLE.ADMIN;
  const { role } = getUserInfo() as any;

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "sticky",
        left: 0,
        top: 0,
        bottom: 0,
      }}
      width={250}
    >
      <Menu
        className="px-4 mt-8 font-semibold"
        mode="inline"
        theme="dark"
        defaultSelectedKeys={["1"]}
        items={sidebarItems(role)}
        style={{ height: "100%", borderRight: 0 }}
      />
    </Sider>
  );
};

export default DashboardSide;
