"use client";
import {
  DeleteOutlined,
  EditOutlined,
  FileImageOutlined,
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
import { getUserInfo } from "@/services/auth.service";
import {
  useDeleteWorkTypeMutation,
  useGetAllTypesQuery,
} from "@/redux/api/workTypeApi";

const ManageWorkTypePage = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [workTypeId, setWorkTypeId] = useState<string>("");

  const [deleteWorkType] = useDeleteWorkTypeMutation();

  const { role } = getUserInfo() as any;

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
  const { data, isLoading } = useGetAllTypesQuery({ ...query });

  const workTypeData = data?.data;
  const meta = data?.meta;

  const deleteHandler = async (id: string) => {
    message.loading("Deleting.....");
    try {
      const res: any = await deleteWorkType(id);
      if (!!res?.data) {
        message.success("workType Deleted successfully");

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
      title: "",
      dataIndex: "images",
      render: function (data: any) {
        return (
          <div className="">
            {!data[0] ? (
              <FileImageOutlined />
            ) : (
              <img className=" w-6 h-6" src={data[0]} alt="img" />
            )}
          </div>
        );
      },
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Service",
      dataIndex: "service",
      render: function (data: any) {
        return <div className="text-center">{data?.title}</div>;
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      render: function (data: any) {
        return <div className="text-center">{data}</div>;
      },
    },
    {
      title: "Booking",
      dataIndex: "booking",
      render: function (data: any) {
        return <div className="text-center">{data?.length}</div>;
      },
    },
    {
      title: "Reviews",
      dataIndex: "reviews",
      render: function (data: any) {
        return <div className="text-center">{data?.length}</div>;
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
            <Link href={`/${role}/manage-workType/edit/${data}`}>
              <Button
                style={{
                  margin: "0px 5px",
                }}
                type="primary"
              >
                <EditOutlined />
              </Button>
            </Link>
            <Button
              onClick={() => {
                setDeleteModal(true);
                setWorkTypeId(data);
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
      <HSBreadCrumb
        items={[
          {
            label: "admin",
            link: "/admin",
          },
          {
            label: "manage-workType",
            link: "/admin/manage-workType",
          },
        ]}
      />
      <ActionBar title={`WorkType List (${meta?.total})`}>
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
          <Link href="/admin/manage-workType/create">
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
        dataSource={workTypeData}
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
        handleOk={() => deleteHandler(workTypeId)}
      >
        <p className="my-5">Do you want to remove this WorkTYpe?</p>
      </CustomModal>
    </div>
  );
};

export default ManageWorkTypePage;
