import React from "react";
import profileIcon from "@/assets/profile.png";
import { Avatar } from "antd";

const SideCard = ({ userData }: any) => {
  return (
    <div>
      <div className="mx-12">
        <div className="mb-8">
          <Avatar
            className=" my-4 lg:mx-16"
            size={200}
            src={!userData?.profileImg ? profileIcon.src : userData?.profileImg}
            alt="profileImg"
          />
          <p className="font-semibold text-center mt-0">{userData?.name}</p>
          <p className="mt-[-12px] text-center text-sm">
            {userData?.role && userData?.role === "user"
              ? "customer"
              : userData?.role}
          </p>
          <p className="text-[15px] mt-[-8px]  text-center">
            {userData?.email}
          </p>
        </div>
        <div className="mt-12 ">
          <p> {userData?.contactNo}</p>
          <p> {userData?.address}</p>
        </div>
        <p></p>
      </div>
    </div>
  );
};

export default SideCard;
