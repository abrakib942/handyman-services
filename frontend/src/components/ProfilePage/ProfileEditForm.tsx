import React from "react";
import CustomForm from "../form/CustomForm";
import FormInput from "../form/FormInput";
import { SubmitHandler } from "react-hook-form";
import TextArea from "antd/es/input/TextArea";
import CustomButton from "../ui/CustomButton";
import { useUpdateUserMutation } from "@/redux/api/userApi";
import Loading from "@/app/Loading";
import { message } from "antd";

const ProfileEditForm = ({ userData, userId }: any) => {
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      const updatedData = {
        id: userId,
        data: { ...data },
      };

      const res: any = await updateUser(updatedData);
      message.loading("Updating...");

      if (res?.data) {
        setTimeout(() => {
          message.success("Updated");
        }, 2000);
      } else {
        setTimeout(() => {
          message.error("Failed to Update. Try Again");
        }, 2000);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

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
                  placeholder={userData?.name}
                  label="Full Name"
                />
              </div>

              <div className="w-full md:w-1/2 p-2">
                <FormInput
                  name="email"
                  type="email"
                  size="large"
                  placeholder={userData?.email}
                  label="Email"
                />
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-full md:w-1/2 p-2">
                <FormInput
                  name="address"
                  type="text"
                  size="large"
                  placeholder={userData?.address}
                  label="Address"
                />
              </div>
              <div className="w-full md:w-1/2 p-2">
                <FormInput
                  name="contactNo"
                  type="text"
                  placeholder={userData?.contactNo}
                  size="large"
                  label="Contact No"
                />
              </div>
            </div>
          </div>
          <div className="text-center">
            <CustomButton className="" htmlType="submit">
              Update
            </CustomButton>
          </div>
        </CustomForm>
      </div>
    </div>
  );
};

export default ProfileEditForm;
