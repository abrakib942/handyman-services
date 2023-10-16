import React from "react";
import bannerImg from "@/assets/banner.png";
import Image from "next/image";

const Banner = () => {
  return (
    <div className="">
      <Image src={bannerImg} alt="banner" />
    </div>
  );
};

export default Banner;
