"use client";

import React, { useState } from "react";

import { Layout } from "antd";

import Sidebar from "@/components/ServicePage/Sidebar";
import WorkType from "@/components/ServicePage/Content";
import Navbar from "@/components/Navbar";

const ServicePage = () => {
  const [selectedService, setSelectedService] = useState(null);

  const handleServiceClick = (service: any) => {
    setSelectedService(service);
  };

  return (
    <Layout>
      <Sidebar handleServiceClick={handleServiceClick} />
      <WorkType selectedService={selectedService} />
    </Layout>
  );
};

export default ServicePage;
