"use client";
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

import { Button, DatePicker, Input, InputNumber, Modal, message } from "antd";
import Link from "next/link";
import { useState } from "react";
import dayjs from "dayjs";
import { useDebounced } from "@/redux/hook";
import ActionBar from "@/components/ui/ActionBar";
import DataTable from "@/components/ui/DataTable";
import HSBreadCrumb from "@/components/ui/HSBreadCrumb";
import CustomModal from "@/components/ui/CustomModal";
import { getUserInfo } from "@/services/auth.service";
import {
  useDeleteBookingMutation,
  useGetAllBookingsQuery,
  useUpdateBookingMutation,
} from "@/redux/api/bookingApi";

const ManageBookingPage = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [bookingId, setBookingId] = useState<string>("");

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
  const { data, isLoading } = useGetAllBookingsQuery({ ...query });

  const [updateBooking] = useUpdateBookingMutation();

  const bookingData = data?.data;
  const meta = data?.meta;

  console.log("booking", bookingData);

  const confirmHandler = async (id: string) => {
    message.loading("cancelling.....");
    try {
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const columns = [
    {
      title: "Items",
      dataIndex: "workType",
      render: function (data: any) {
        return <div>{data?.title}</div>;
      },
    },
    {
      title: "Price",
      dataIndex: "workType",
      render: function (data: any) {
        return <div>{data?.price}</div>;
      },
    },
    {
      title: "Customer",
      dataIndex: "user",
      render: function (data: any) {
        return <div>{data?.email}</div>;
      },
    },
    {
      title: "Booking Date",
      dataIndex: "date",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      render: function (data: any) {
        return <div>{data}</div>;
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
      render: function (data: any, rowData: any) {
        return (
          <>
            <Button
              style={{
                margin: "0px 5px",
              }}
              type="primary"
            >
              Confirm
            </Button>

            <Button
              onClick={() => {
                setDeleteModal(true);
                setBookingId(data);
              }}
              type="primary"
              danger
            >
              Cancel
            </Button>
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
            label: "manage-booking",
            link: "/admin/manage-booking",
          },
        ]}
      />
      <ActionBar title={`Booking List (${meta?.total})`}>
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
        dataSource={bookingData}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />

      <CustomModal
        title={`Cancel Booking`}
        isOpen={deleteModal}
        closeModal={() => setDeleteModal(false)}
        handleOk={() => confirmHandler(bookingId)}
      >
        <p className="my-5">Do you want to Cancel this booking?</p>
      </CustomModal>
    </div>
  );
};

export default ManageBookingPage;
