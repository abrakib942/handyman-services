"use client";

import Loading from "@/app/Loading";
import Navbar from "@/components/Navbar";
import ProfileEditForm from "@/components/ProfilePage/ProfileEditForm";
import SideCard from "@/components/ProfilePage/SideCard";
import { useGetSingleUserQuery } from "@/redux/api/userApi";
import dynamic from "next/dynamic";
import React from "react";

const ProfilePage = ({ params }: { params: any }) => {
  const { userId } = params;

  const { data: userData, isLoading } = useGetSingleUserQuery(userId);

  console.log("data", userData);

  console.log("id", userId);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Navbar />
      <div className="bg-[#F5F5F5]">
        <div className="md:flex items-center gap-10 px-8 lg:px-12 py-8 ">
          <div className="md:w-[35%] bg-white h-[100vh] rounded-xl">
            <SideCard userData={userData} />
          </div>
          <div className="md:w-[65%] bg-white h-[100vh] rounded-xl">
            <ProfileEditForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(ProfilePage), { ssr: false });
