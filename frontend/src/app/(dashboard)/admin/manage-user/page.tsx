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
import { useDeleteUserMutation, useGetAllUserQuery } from "@/redux/api/userApi";

const ManageWorkTypePage = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");

  const [deleteUser] = useDeleteUserMutation();

  const { role: loginRole } = getUserInfo() as any;

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
  const { data, isLoading } = useGetAllUserQuery({ ...query });

  const userData = data;
  const meta = data?.meta;

  const deleteHandler = async (id: string) => {
    message.loading("Deleting.....");
    try {
      const res: any = await deleteUser(id);
      if (!!res?.data) {
        message.success("user Deleted successfully");

        setDeleteModal(false);
      } else {
        message.error("Failed to Delete, try again");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const buttonComponent = (id: any) => {
    return (
      <Button
        onClick={() => {
          setDeleteModal(true);
          setUserId(id);
        }}
        type="primary"
        danger
      >
        <DeleteOutlined />
      </Button>
    );
  };

  const columns = [
    {
      title: "",
      dataIndex: "profileImg",
      render: function (data: any) {
        return (
          <div className="">
            {!data ? (
              <FileImageOutlined />
            ) : (
              <img className=" w-6 h-6" src={data} alt="img" />
            )}
          </div>
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      render: function (data: any) {
        return <div className="">{data}</div>;
      },
    },
    {
      title: "ContactNo",
      dataIndex: "contactNo",
      render: function (data: any) {
        return <div className="">{data}</div>;
      },
    },
    {
      title: "Address",
      dataIndex: "address",
      render: function (data: any) {
        return <div className="">{data}</div>;
      },
    },
    {
      title: "Role",
      dataIndex: "role",
      render: function (data: any) {
        return (
          <div className="">{data === "user" ? <p>customer</p> : data}</div>
        );
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
      title: "",
      dataIndex: "role",
      render: function (data: any) {
        return (
          <>
            <div>
              {data === "admin" ? (
                <Button className="bg-yellow-500 font-semibold">
                  make customer
                </Button>
              ) : data === "user" ? (
                <Button className="bg-green-500 font-semibold text-white">
                  make admin
                </Button>
              ) : loginRole === "super_admin" && data === "super_admin" ? (
                <div>
                  <Button type="primary"> make admin </Button>
                </div>
              ) : (
                ""
              )}
            </div>
          </>
        );
      },
    },
    {
      title: "",
      dataIndex: "id",
      render: function (id: any, rowData: any) {
        return (
          <>
            {loginRole !== "super_admin" && rowData.role === "super_admin"
              ? ""
              : buttonComponent(id)}
          </>
        );
      },
    },
  ];

  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;

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
            label: "manage-user",
            link: "/admin/manage-user",
          },
        ]}
      />
      <ActionBar title={`User List (${userData?.length})`}>
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
          <Link href="">
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
        dataSource={userData}
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
        handleOk={() => deleteHandler(userId)}
      >
        <p className="my-5">Do you want to remove this User?</p>
      </CustomModal>
    </div>
  );
};

export default ManageWorkTypePage;
