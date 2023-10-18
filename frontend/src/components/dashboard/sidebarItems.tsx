import type { MenuProps } from "antd";
import {
  ProfileOutlined,
  TableOutlined,
  AppstoreOutlined,
  ScheduleOutlined,
  ThunderboltOutlined,
  CreditCardOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { USER_ROLE } from "@/constants/role";

export const sidebarItems = (role: string) => {
  //   const defaultSidebarItems: MenuProps["items"] = [
  //     {
  //       label: "Profile",
  //       key: "profile",
  //       icon: <ProfileOutlined />,
  //       children: [
  //         {
  //           label: <Link href={`/${role}`}>Account Profile</Link>,
  //           key: `/${role}/profile`,
  //         },
  //         {
  //           label: <Link href={`/${role}/change-password`}>Change Password</Link>,
  //           key: `/${role}/change-password`,
  //         },
  //       ],
  //     },
  //   ];

  const adminSidebarItems: MenuProps["items"] = [
    {
      label: <Link href={`/${role}/manage-service`}>Manage Services</Link>,
      icon: <TableOutlined />,
      key: `/${role}/manage-service`,
    },
    {
      label: <Link href={`/${role}/manage-workType`}>Manage WorkTypes</Link>,
      icon: <TableOutlined />,
      key: `/${role}/manage-workType`,
    },
    {
      label: <Link href={`/${role}/manage-booking`}>Manage Booking</Link>,
      icon: <TableOutlined />,
      key: `/${role}/manage-booking`,
    },
    {
      label: <Link href={`/${role}/manage-content`}>Manage Contents</Link>,
      icon: <TableOutlined />,
      key: `/${role}/manage-content`,
    },
    {
      label: <Link href={`/${role}/manage-user`}>Manage Users</Link>,
      icon: <TableOutlined />,
      key: `/${role}/manage-user`,
    },
    {
      label: <Link href={`/${role}/manage-review`}>Manage Reviews</Link>,
      icon: <TableOutlined />,
      key: `/${role}/manage-review`,
    },
  ];

  const superAdminSidebarItems: MenuProps["items"] = [
    ...adminSidebarItems,
    {
      label: <Link href={`/${role}/admin`}>Manage Admin</Link>,
      icon: <TableOutlined />,
      key: `/${role}/admin`,
    },
  ];
  const userSidebarItems: MenuProps["items"] = [
    {
      label: <Link href={`/${role}/history`}>Booking History</Link>,
      icon: <TableOutlined />,
      key: `/${role}/history`,
    },
    {
      label: <Link href={`/${role}/reviews`}>Reviews</Link>,
      icon: <TableOutlined />,
      key: `/${role}/reviews`,
    },
  ];

  if (role === USER_ROLE.SUPER_ADMIN) return superAdminSidebarItems;
  else if (role === USER_ROLE.ADMIN) return adminSidebarItems;
  else if (role === USER_ROLE.USER) return userSidebarItems;
  //   else {
  //     return defaultSidebarItems;
  //   }
};
