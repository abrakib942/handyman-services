import {
  Card,
  Modal,
  DatePicker,
  TimePicker,
  InputNumber,
  message,
} from "antd";
import React, { useState } from "react";
import CustomButton from "../ui/CustomButton";
import { getUserInfo, isLoggedIn } from "@/services/auth.service";
import { useAddToBookingMutation } from "@/redux/api/bookingApi";
import Loading from "@/app/Loading";
import dayjs from "dayjs";
import cardImg from "@/assets/Handyman-Service.jpg";

const WorkTypeCard = ({ item }: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [price, setPrice] = useState(item.price);

  const [addToBooking, { isLoading }] = useAddToBookingMutation();

  const handleBookClick = () => {
    setModalVisible(true);
  };

  const loginUser = isLoggedIn();
  const { userId, role } = getUserInfo() as any;

  const handleConfirm = async (data: any) => {
    if (!selectedDate) {
      message.error("Please select both date and time.");
      return;
    }

    const bookingData = {
      date: selectedDate,
      userId: userId,
      workTypeId: item.id,
    };

    try {
      await addToBooking(bookingData).unwrap();
      message.loading("Creating.....");

      setTimeout(() => {
        message.success("Booking created successfully");
      }, 2000);

      setModalVisible(false);
    } catch (err: any) {
      message.error("Failed to create booking");
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Card
        hoverable
        style={{ width: 250 }}
        cover={
          <img
            height={200}
            src="https://www.jasspaintingservices.com.au/wp-content/uploads/2020/11/Handyman-Service-service-detail-img.jpg"
            alt=""
          />
        }
      >
        <div>
          <p className="text-[16px]">{item.title}</p>
          <p>
            {" "}
            from{" "}
            <span className="text-red-500 font-bold text-lg">
              ${item.price}
            </span>{" "}
          </p>

          {loginUser && role === "user" ? (
            <CustomButton onClick={handleBookClick}>Book</CustomButton>
          ) : (
            <p className="text-red-500">
              *Please login as a Customer for booking
            </p>
          )}
        </div>
      </Card>

      <Modal
        title={`Confirmation for - "${item.title}"`}
        open={modalVisible}
        onOk={handleConfirm}
        onCancel={() => setModalVisible(false)}
      >
        <div>
          <label className="mr-2">Select Date and Time:</label>
          <DatePicker
            value={selectedDate}
            format="YYYY-MM-DD HH:mm"
            showTime={{ format: "HH:mm" }}
            onChange={(date: any) => setSelectedDate(date)}
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <label className="mr-2">Price:</label>
          <InputNumber
            readOnly
            value={price}
            onChange={(value) => setPrice(value)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default WorkTypeCard;
