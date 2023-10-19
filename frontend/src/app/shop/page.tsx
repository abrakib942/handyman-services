"use client";

import CustomButton from "@/components/ui/CustomButton";
import Link from "next/link";
import React from "react";

const ShopPage = () => {
  return (
    <div className="text-center">
      <p className="font-bold text-center mt-16"> upcoming...</p>
      <Link href="/">
        <CustomButton>Back</CustomButton>
      </Link>
    </div>
  );
};

export default ShopPage;
