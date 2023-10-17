"useClient";

import Loading from "@/app/Loading";
import { useGetAllServicesQuery } from "@/redux/api/serviceApi";
import { Layout, Menu, theme } from "antd";
import type { MenuProps } from "antd";
import React from "react";

const { Sider } = Layout;

//   const key = String(index + 1);

//   return {
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

const Sidebar = () => {
  const { data, isLoading } = useGetAllServicesQuery(undefined);

  if (isLoading) {
    return <Loading />;
  }

  const menuItems = data?.map((item: any, index: any) => (
    <Menu.Item key={`menu-${index}`}>{item.title}</Menu.Item>
  ));

  //   const {
  //     token: { colorBgContainer },
  //   } = theme.useToken();
  // style={{ background: colorBgContainer }}

  return (
    <Sider width={200}>
      <Menu
        className="pl-2 font-semibold"
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        style={{ height: "100%", borderRight: 0 }}
      >
        <div className="my-8 px-6 text-[#ababab]">Services</div>
        <Menu.Item>All</Menu.Item>

        {menuItems}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
