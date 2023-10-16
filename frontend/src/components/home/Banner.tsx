import React from "react";
import bannerImg from "@/assets/banner.png";
import Image from "next/image";
import CustomButton from "../ui/CustomButton";

const Banner = () => {
  return (
    <div className="bg-[#E3F1FF] py-5 px-10 lg:px-24 lg:flex items-center justify-center gap-10">
      <div>
        <Image
          className="pt-12 w-[70%] h-[70%] md:w-full md:h-full"
          src={bannerImg}
          alt="banner"
        />
      </div>
      <div className="md:pl-10">
        <p className=" tracking-[.2rem] font-bold text-[15px]">PROFESSIONAL</p>
        <p className="md:text-[64px] text-4xl font-bold mt-2 mb-10 leading-none">
          Handyman Services
        </p>
        <CustomButton>Our Services</CustomButton>
      </div>
    </div>
  );
};

export default Banner;
