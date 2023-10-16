import React from "react";
import icon1 from "@/assets/hreno_icon1.png";
import icon2 from "@/assets/hreno_icon2.png";
import icon3 from "@/assets/hreno_icon3.png";
import icon4 from "@/assets/heroIcon4.png";
import Image from "next/image";

const BannerBottom = () => {
  const items = [
    {
      title: "PROFESSIONAL HANDYMAN",
      icon: icon1,
    },
    {
      title: "AFFORDABLE PRICE",
      icon: icon2,
    },
    {
      title: "24/7 SERVICES",
      icon: icon3,
    },
    {
      title: "BEST MATERIALS",
      icon: icon4,
    },
  ];

  return (
    <div className="bg-[#1C2536] md:px-40 px-20 gap-5 py-5 grid md:grid-cols-2 lg:grid-cols-4 lg:mt-[-24px]">
      {items.map((item) => (
        <div className="flex items-center justify-center gap-6">
          <Image src={item.icon} alt="" />
          <p className="text-white font-semibold text-[16px] text-start leading-relaxed tracking-wider ">
            {item.title}
          </p>
        </div>
      ))}
    </div>
  );
};

export default BannerBottom;
