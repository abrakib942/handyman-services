"useClient";

import Loading from "@/app/Loading";
import { useGetAllServicesQuery } from "@/redux/api/serviceApi";
import { Layout, Menu, theme } from "antd";
import type { MenuProps } from "antd";
import Link from "next/link";
import React from "react";

const { Sider } = Layout;

//     key: `sub${key}`,
//     icon: React.createElement(icon),
//     label: `subnav ${key}`,

//     children: new Array(4).fill(null).map((_, j) => {
//       const subKey = index * 4 + j + 1;
//       return {
//         key: subKey,
//         label: `option${subKey}`,
//       };
//     }),
//   };
// });

const Sidebar = ({ handleServiceClick }: any) => {
  const { data, isLoading } = useGetAllServicesQuery(undefined);

  const menuItems = data?.map((item: any, index: any) => (
    <Menu.Item key={index} onClick={() => handleServiceClick(item.id)}>
      {item.title}
    </Menu.Item>
  ));

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Sider
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
      }}
      width={200}
    >
      <Menu
        className="pl-2 font-semibold mt-3"
        mode="inline"
        defaultSelectedKeys={["all"]}
        defaultOpenKeys={["sub1"]}
        style={{ height: "100%", borderRight: 0 }}
      >
        <div className="my-8 px-6 text-[#ababab]">Services</div>
        <Menu.Item key="all" onClick={() => handleServiceClick(null)}>
          All
        </Menu.Item>
        {menuItems}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
