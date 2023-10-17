"use client";

import React from "react";

import { Layout } from "antd";

import Sidebar from "@/components/ServicePage/Sidebar";
import WorkType from "@/components/ServicePage/Content";
import Navbar from "@/components/Navbar";

const ServicePage = () => {
  return (
    <>
      {/* <div>
        <Navbar />
      </div> */}

      <Layout>
        <Sidebar />
        <WorkType />
      </Layout>
    </>
  );
};

export default ServicePage;
