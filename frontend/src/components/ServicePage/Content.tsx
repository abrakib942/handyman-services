"use client";

import { Breadcrumb, Layout, Pagination, theme } from "antd";
import React, { useState } from "react";
import HSBreadCrumb from "../ui/HSBreadCrumb";
import { useGetAllTypesQuery } from "@/redux/api/workTypeApi";
import Loading from "@/app/Loading";
import { useDebounced } from "@/redux/hook";
import WorkTypeCard from "./WorkTypeCard";
import { Input, Space } from "antd";

const { Content } = Layout;

const { Search } = Input;

const WorkType = ({ selectedService }: any) => {
  const query: Record<string, any> = {
    serviceId: selectedService ? selectedService.id : null,
  };

  const [page, setPage] = useState<number>(1);
  const [limit, setlimit] = useState<number>(8);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  query["limit"] = limit;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  // Fetch work types based on the selected service
  const { data, isLoading } = useGetAllTypesQuery({ ...query });

  if (isLoading) {
    return <Loading />;
  }

  const workTypes = data?.data;
  const meta = data?.meta;

  console.log("meta", meta);

  const workTypeServiceId = workTypes?.map((item: any) => item);
  console.log("selectedService", selectedService);
  console.log("worktype", workTypes);

  return (
    <Layout
      className="mt-8"
      style={{ padding: "0 24px 24px", marginLeft: 200 }}
    >
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
          minHeight: 400,
          overflow: "initial",
          background: "white",
        }}
      >
        <div className="mb-5">
          <Search
            placeholder="Search WorkTypes"
            allowClear
            size="large"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            style={{ width: 300 }}
          />
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5 ">
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
          {workTypes?.map((item: any, i: React.Key | null | undefined) => (
            <div key={i}>
              <WorkTypeCard item={item} />
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Pagination
            total={meta.total}
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} of ${total} items`
            }
            defaultPageSize={8}
            onChange={handlePageChange}
            showQuickJumper
          />
        </div>
      </Content>
    </Layout>
  );
};

export default WorkType;
