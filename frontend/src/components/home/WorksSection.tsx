import React from "react";
import { Divider, Tabs } from "antd";
import { useGetAllServicesQuery } from "@/redux/api/serviceApi";
import Loading from "@/app/Loading";
import { useGetAllTypesQuery } from "@/redux/api/workTypeApi";
import WorkTypeCard from "../ServicePage/WorkTypeCard";
import Link from "next/link";

const WorksSection = ({ handleServiceClick }: any) => {
  const { data, isLoading } = useGetAllServicesQuery(undefined);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-[#1C2536] md:px-24 py-16">
      <div className="mb-10">
        <p className="text-[#ababab] text-sm font-semibold tracking-widest">
          OUR WORK
        </p>
        <p className="md:text-4xl text-2xl font-bold mt-2 mb-6 text-white">
          Super Quality Work And Commitment
        </p>
        <p className="h-1.5 w-14 bg-[#FBD232]"></p>
      </div>
      <div className="bg-[#FBD232] bg-opacity-80 px-12 text-white py-8">
        <Tabs
          className="font-semibold"
          defaultActiveKey="0"
          onChange={handleServiceClick}
        >
          {data?.map((item: any, index: number) => (
            <Tabs.TabPane tab={item.title} key={index}>
              <HomeWorkTypes item={item} />
            </Tabs.TabPane>
          ))}
        </Tabs>
        <Link href="/services">
          <p className="text-center font-bold my-4"> View All</p>
        </Link>
      </div>
    </div>
  );
};

export default WorksSection;

export const HomeWorkTypes = ({ selectedService, item }: any) => {
  const query: Record<string, any> = {};

  const { data, isLoading } = useGetAllTypesQuery({
    service: item.id,
  });

  const workTypes = data?.data;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5 ">
        {workTypes
          ?.slice(0, 4)
          .map((item: any, i: React.Key | null | undefined) => (
            <div key={i}>
              <WorkTypeCard item={item} />
            </div>
          ))}
      </div>
    </div>
  );
};
