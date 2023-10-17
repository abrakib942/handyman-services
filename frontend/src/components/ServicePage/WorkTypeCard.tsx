import { Card, Modal, DatePicker, TimePicker, InputNumber } from "antd";
import React, { useState } from "react";
import CustomButton from "../ui/CustomButton";

const WorkTypeCard = ({ item }: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [price, setPrice] = useState(item.price);

  const handleBookClick = () => {
    setModalVisible(true);
  };

  const handleConfirm = () => {
    // Handle confirmation logic here
    console.log(
      "Booking confirmed with date:",
      selectedDate,
      "time:",
      selectedTime,
      "and price:",
      price
    );
    setModalVisible(false);
  };

  return (
    <div>
      <Card
        hoverable
        style={{ width: 250 }}
        cover={<img alt="" height={200} src={item.images[0]} />}
      >
        <div>
          <p className="text-[16px]">{item.title}</p>
          <p>
            {" "}
            from{" "}
            <span className="text-red-600 font-bold text-lg">
              ${item.price}
            </span>{" "}
          </p>

          <CustomButton onClick={handleBookClick}>Book</CustomButton>
        </div>
      </Card>

      <Modal
        title={`Confirmation for - "${item.title}"`}
        open={modalVisible}
        onOk={handleConfirm}
        onCancel={() => setModalVisible(false)}
      >
        <div>
          <label className="mr-2">Select Date:</label>
          <DatePicker
            value={selectedDate}
            onChange={(date: any) => setSelectedDate(date)}
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <label className="mr-2">Select Time:</label>
          <TimePicker
            value={selectedTime}
            onChange={(time: any) => setSelectedTime(time)}
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
