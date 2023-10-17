"use client";

import { Breadcrumb, Layout, theme } from "antd";
import React, { useState } from "react";
import HSBreadCrumb from "../ui/HSBreadCrumb";
import { useGetAllTypesQuery } from "@/redux/api/workTypeApi";
import Loading from "@/app/Loading";
import { useDebounced } from "@/redux/hook";
import WorkTypeCard from "./WorkTypeCard";

const { Content } = Layout;

const WorkType = ({ selectedService }: any) => {
  const query: Record<string, any> = {
    serviceId: selectedService ? selectedService.id : null,
  };

  // Fetch work types based on the selected service
  const { data, isLoading } = useGetAllTypesQuery(query);

  if (isLoading) {
    return <Loading />;
  }

  const workTypes = data?.data;

  const workTypeServiceId = data?.data.map((item: any) => item.serviceId);
  console.log("selectedService", selectedService);
  console.log("worktype", workTypeServiceId);

  return (
    <Layout className="mt-8" style={{ padding: "0 24px 24px" }}>
      <HSBreadCrumb
        items={[
          {
            label: "services",
            link: "/services",
          },
          {
            label: selectedService?.title || "All",
            link: selectedService ? `/services` : "/services",
          },
        ]}
      />

      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: 400,
          background: "white",
        }}
      >
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">
          {/* {workTypeServiceId.map((itemId: any, i: any) => (
            <div key={i}>
              {itemId === selectedService?.id
                ? selectedService?.workTypes?.map(
                    (item: any, i: React.Key | null | undefined) => (
                      <div key={i}>
                        <WorkTypeCard item={item} />
                      </div>
                    )
                  )
                : null ||
                  workTypes?.map(
                    (item: any, i: React.Key | null | undefined) => (
                      <div key={i}>
                        <WorkTypeCard item={item} />
                      </div>
                    )
                  )}
            </div>
          ))} */}
          {selectedService?.workTypes?.map(
            (item: any, i: React.Key | null | undefined) => (
              <div key={i}>
                <WorkTypeCard item={item} />
              </div>
            )
          )}
        </div>
      </Content>
    </Layout>
  );
};

export default WorkType;
