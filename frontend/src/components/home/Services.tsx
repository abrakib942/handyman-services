"use client";

import React from "react";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import { useGetAllServicesQuery } from "@/redux/api/serviceApi";
import Loading from "@/app/Loading";
import ServiceIcons from "./serviceIcons";

const Services = () => {
  const { data, isLoading } = useGetAllServicesQuery(undefined);

  if (isLoading) {
    return <Loading />;
  }

  console.log("data", data);

  return (
    <div className="my-24 md:px-32 px-8">
      <div className="mb-10">
        <p className="text-[#ababab] text-sm font-semibold tracking-widest">
          OUR SERVICES
        </p>
        <p className="md:text-4xl text-2xl font-bold mt-2 mb-6">
          How We Can Help You
        </p>
        <p className="h-1.5 w-14 bg-[#FBD232]"></p>
      </div>

      {/* card.. */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-10 ">
        {data?.slice(0, 8).map((item: any, i: React.Key | null | undefined) => (
          <Card
            className="hover:bg-[#1c2536] hover:text-[15px] hover:text-white "
            key={i}
            hoverable
            style={{ width: 250 }}
          >
            <div className="text-center mb-5 hover:text-white">
              <ServiceIcons title={item.title} />
            </div>
            <div className="text-center">
              <p className="font-bold">{item.title}</p>
              <p>{item.heading}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Services;