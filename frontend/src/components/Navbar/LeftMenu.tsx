import { Menu, MenuProps } from "antd";

const LeftMenu = ({ mode }: any) => {
  const items: MenuProps["items"] = [
    "HOME",
    "SERVICES",
    "BLOG",
    "ABOUT US",
    "CONTACT US",
  ].map((key) => ({
    key,
    label: `${key}`,
  }));

  return (
    <Menu
      style={{
        fontWeight: 700,
      }}
      mode={mode}
      items={items}
    />
  );
};

export default LeftMenu;
