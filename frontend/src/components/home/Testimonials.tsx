"use client";

import { Swiper as SwiperComponent } from "swiper/react";
import { SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";

const Testimonials = () => {
  const testimonials = [
    {
      name: "David Jeams",
      title: "Business man",
      description:
        "simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it is a long established fact that a reader will be distracted by the readable content",
      // img: slide1,
    },
    {
      name: "David Jeams",
      title: "Govt. Employee",
      description:
        "simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it is a long established fact that a reader will be distracted by the readable content",
      // img: slide1,
    },
    {
      name: "David Jeams",
      title: "Patient",
      description:
        "simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it is a long established fact that a reader will be distracted by the readable content",
      //   img: slide1,
    },
  ];

  return (
    <div className="my-24 md:px-32 px-8">
      <div className="mb-10">
        <p className="text-[#ababab] text-sm font-semibold tracking-widest">
          TESTIMONIALS
        </p>
        <p className="md:text-4xl text-2xl font-bold mt-2 mb-6">
          What Our Customers Are Saying
        </p>
        <p className="h-1.5 w-14 bg-[#FBD232]"></p>
      </div>

      {/* card.. */}
      <div className="">
        <>
          <SwiperComponent
            // navigation={true}
            slidesPerView={2}
            spaceBetween={20}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {testimonials?.map((testimonial, index) => (
              <SwiperSlide key={index} className="flex items-center">
                <div className="px-10 lg:px-4 lg:mb-10 z-20">
                  <p className="border-2 border-[#FBD232] border-solid p-10 pl-16 relative">
                    <span className="absolute top-5  left-8 text-[#FBD232] text-[100px] -ml-6 -mt-6">
                      “
                    </span>
                    {testimonial.description}
                  </p>
                  <p className="text-lg font-bold mb-1">{testimonial.name}</p>
                  <p className="font-semibold text-sm text-[#ababab] mt-0">
                    {testimonial.title}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </SwiperComponent>
        </>
      </div>
    </div>
  );
};

export default Testimonials;
