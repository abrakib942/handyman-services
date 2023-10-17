"use client";

import { Menu, MenuProps } from "antd";
import Link from "next/link";

const LeftMenu = ({ mode }: any) => {
  const items: any = [
    { key: "HOME", label: "HOME", link: "/" },
    { key: "SERVICES", label: "SERVICES", link: "/services" },
    { key: "SHOP", label: "SHOP", link: "/shop" },
    { key: "BLOG", label: "BLOG", link: "/blog" },
    { key: "ABOUT US", label: "ABOUT US", link: "/about" },
    { key: "CONTACT US", label: "CONTACT US", link: "/contact" },
  ];

  return (
    <Menu style={{ fontWeight: 700 }} mode={mode}>
      {items.map((item: any) => (
        <Menu.Item key={item.key}>
          <Link href={item.link} passHref>
            {item.label}
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default LeftMenu;
