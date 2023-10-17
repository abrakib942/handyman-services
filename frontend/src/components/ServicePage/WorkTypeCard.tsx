"use client";

import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import Image from "next/image";
import React from "react";
import CustomButton from "../ui/CustomButton";

const WorkTypeCard = ({ item }: any) => {
  return (
    <div>
      {" "}
      <Card
        hoverable
        style={{ width: 240 }}
        cover={<img alt="" height={200} src={item.images[0]} />}
      >
        <div>
          <p className="">{item.title}</p>

          <CustomButton>Book</CustomButton>
        </div>
      </Card>
    </div>
  );
};

export default WorkTypeCard;
