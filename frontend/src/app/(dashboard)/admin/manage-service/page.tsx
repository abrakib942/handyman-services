"use client";
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

import { Button, Input, message } from "antd";
import Link from "next/link";
import { useState } from "react";
import dayjs from "dayjs";
import { useDebounced } from "@/redux/hook";
import {
  useDeleteServiceMutation,
  useGetAllServicesQuery,
} from "@/redux/api/serviceApi";
import ActionBar from "@/components/ui/ActionBar";
import DataTable from "@/components/ui/DataTable";
import HSBreadCrumb from "@/components/ui/HSBreadCrumb";
import CustomModal from "@/components/ui/CustomModal";
import CustomButton from "@/components/ui/CustomButton";

const ManageServicePage = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [serviceId, setServiceId] = useState<string>("");

  const [deleteService] = useDeleteServiceMutation();

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  // query["searchTerm"] = searchTerm;

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }
  const { data, isLoading } = useGetAllServicesQuery({ ...query });

  const servicesData = data?.data;
  const meta = data?.meta;

  const deleteHandler = async (id: string) => {
    message.loading("Deleting.....");
    try {
      console.log(id);
      const res: any = await deleteService(id);
      if (!!res?.data) {
        message.success("Service Deleted successfully");

        setDeleteModal(false);
      } else {
        message.error("Failed to Delete, try again");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "WorkTypes(total)",
      dataIndex: "workTypes",
      render: function (data: any) {
        return <div className="ml-8">{data?.length}</div>;
      },
    },
    {
      title: "Booking",
      dataIndex: "booking",
      render: function (data: any) {
        return <div className="ml-8">{data?.length}</div>;
      },
    },
    {
      title: "Reviews",
      dataIndex: "reviews",
      render: function (data: any) {
        return <div className="ml-8">{data?.length}</div>;
      },
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
    {
      title: "Action",
      dataIndex: "id",
      render: function (data: any) {
        return (
          <>
            <Link href={``}>
              <Button
                style={{
                  margin: "0px 5px",
                }}
                onClick={() => console.log(data)}
                type="primary"
              >
                <EditOutlined />
              </Button>
            </Link>
            <Button
              onClick={() => {
                setDeleteModal(true);
                setServiceId(data);
              }}
              type="primary"
              danger
            >
              <DeleteOutlined />
            </Button>
          </>
        );
      },
    },
  ];

  const onPaginationChange = (page: number, pageSize: number) => {
    console.log("Page:", page, "PageSize:", pageSize);
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    // console.log(order, field);
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };

  return (
    <div>
      <ActionBar title={`Service List (${servicesData?.length})`}>
        <Input
          type="text"
          size="large"
          placeholder="Search..."
          style={{
            width: "30%",
            marginBottom: 10,
          }}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <div>
          <Link href="/admin/manage-service/create">
            <CustomButton>Create</CustomButton>
          </Link>
          {(!!sortBy || !!sortOrder || !!searchTerm) && (
            <Button
              onClick={resetFilters}
              type="primary"
              style={{ margin: "0px 5px" }}
            >
              <ReloadOutlined />
            </Button>
          )}
        </div>
      </ActionBar>

      <DataTable
        loading={isLoading}
        columns={columns}
        dataSource={servicesData}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />

      <CustomModal
        title={`Remove Service`}
        isOpen={deleteModal}
        closeModal={() => setDeleteModal(false)}
        handleOk={() => deleteHandler(serviceId)}
      >
        <p className="my-5">Do you want to remove this service?</p>
      </CustomModal>
    </div>
  );
};

export default ManageServicePage;
