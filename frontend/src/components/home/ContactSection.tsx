"use client";

import React from "react";
import contactImg from "@/assets/contactImg.png";
import Image from "next/image";
import CustomButton from "../ui/CustomButton";
import CustomForm from "../form/CustomForm";
import { SubmitHandler } from "react-hook-form";
import FormInput from "../form/FormInput";
import FormTextArea from "../form/FormTextArea";
import TextArea from "antd/es/input/TextArea";

const ContactSection = () => {
  const onSubmit: SubmitHandler<any> = async (data: any) => {
    console.log(data);
  };

  return (
    <div className="bg-[#E3F1FF] py-10 px-10 lg:px-24 lg:flex items-center justify-center gap-10 ">
      <div>
        <Image
          className="pt-12 md:pl-10 w-[70%] h-[70%] md:w-full md:h-full"
          src={contactImg}
          alt="banner"
        />
      </div>
      <div className="md:ml-10  bg-white p-10 ">
        <p className="text-[#ababab] tracking-[.2rem] font-bold text-[15px] ">
          SEND US AN EMAIL
        </p>
        <p className="md:text-[36px] text-3xl font-bold mt-2 mb-4 leading-none">
          Get A Quick Quote
        </p>
        <div>
          <p className="text-[#777777] my-8">
            Send us an email by entering your details and any comments you may
            have in the form.
          </p>
          <CustomForm submitHandler={onSubmit}>
            <div className="text-[#777777] ">
              <div className="flex items-center">
                <div className="w-full md:w-1/2 p-2">
                  <FormInput
                    name="name"
                    type="text"
                    size="large"
                    label="Your Name"
                  />
                </div>

                <div className="w-full md:w-1/2 p-2">
                  <FormInput
                    name="email"
                    type="email"
                    size="large"
                    label="Your Email"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-full md:w-1/2 p-2">
                  <FormInput
                    name="text"
                    type="text"
                    size="large"
                    label="Subject"
                  />
                </div>
                <div className="w-full md:w-1/2 p-2">
                  <FormInput
                    name="text"
                    type="text"
                    size="large"
                    label="Phone"
                  />
                </div>
              </div>
              <div className="w-full p-2">
                <TextArea
                  rows={4}
                  placeholder="Your Message"
                  showCount
                  maxLength={300}
                  style={{ height: 120, marginBottom: 24 }}
                />
              </div>
            </div>
          </CustomForm>
        </div>

        <CustomButton htmlType="submit">Submit</CustomButton>
      </div>
    </div>
  );
};

export default ContactSection;
