import React from "react";
import handyman from "@/assets/handyman.png";
import Image from "next/image";
import Link from "next/link";
import CustomButton from "../ui/CustomButton";

const HandymanSection = () => {
  return (
    <div className="bg-[#E3F1FF] px-10 lg:px-20 lg:flex items-center gap-20 ">
      <div>
        <Image
          className=" md:pl-10 w-[70%] h-[70%] md:w-full md:h-full flex-1"
          src={handyman}
          alt="handyman"
        />
      </div>
      <div className="md:ml-10 flex-1">
        <p className="text-[#ababab] tracking-[.2rem] font-bold text-[15px]">
          OUR SERVICES
        </p>
        <p className="md:text-[36px] text-3xl font-bold mt-2 mb-4 leading-none">
          We Are Professional & Thoughtful HandyMan
        </p>
        <p className="text-[#777777] mb-6">
          Every home owner has a list of renovation, home repair, or home
          improvement projects he or she needs done — both interior and
          exterior. Sometimes that list can get quite long, too! The bathrooms
          that needs updating. The garbage disposal that’s on the fritz. The
          basement that needs drywall repairs. But with today’s busy lifestyles,
          who has the time or the patience to do it all yourself? Let us help
          your home run more smoothly with a wide range of affordable repair,
          improvement.
        </p>
        <Link href="/services">
          <CustomButton>Get a Free Quote</CustomButton>
        </Link>
      </div>
    </div>
  );
};

export default HandymanSection;
