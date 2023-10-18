import React from "react";
import CustomForm from "../form/CustomForm";
import FormInput from "../form/FormInput";
import { SubmitHandler } from "react-hook-form";
import TextArea from "antd/es/input/TextArea";
import CustomButton from "../ui/CustomButton";

const ProfileEditForm = () => {
  const onSubmit: SubmitHandler<any> = async (data: any) => {
    console.log(data);
  };

  return (
    <div>
      <div className="md:ml-10  bg-white p-10 ">
        <p className="text-gray-500 text-center  font-bold text-[15px] ">
          Update your Information
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
                <FormInput name="text" type="text" size="large" label="Phone" />
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
        <div className="text-center">
          <CustomButton className="" htmlType="submit">
            Update
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditForm;
