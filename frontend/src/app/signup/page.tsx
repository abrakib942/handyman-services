/* eslint-disable react/no-unescaped-entities */
"use client";

import { Metadata } from "next";
import { SubmitHandler } from "react-hook-form";
import { Col, Row, message } from "antd";
import Image from "next/image";
import CustomForm from "@/components/form/CustomForm";
import FormInput from "@/components/form/FormInput";
import signupImage from "@/assets/signup.png";
import CustomButton from "@/components/ui/CustomButton";
import Link from "next/link";
import { useUserSignUpMutation } from "@/redux/api/authApi";
import { useRouter } from "next/navigation";
import Loading from "../Loading";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "@/schemas/login";

export const metaData: Metadata = {
  title: "Handyman | SignUp",
};

type FormValues = {
  name: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const [userSignUp, { isLoading }] = useUserSignUpMutation();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      const response: any = await userSignUp({ ...data });

      if (!!response?.data) {
        message.success({
          content: "Account Created successfully!",
          key: "login-loading",
          duration: 2,
        });
        router.push("/login");
      }

      if (response?.error) {
        message.error(response?.error?.data?.message);
      }
    } catch (error: any) {}
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        minHeight: "100vh",
      }}
    >
      <Col sm={12} md={8} lg={8}>
        <h1
          style={{
            margin: "15px 0px",
          }}
        >
          Register an Account
        </h1>
        <div>
          <CustomForm
            submitHandler={onSubmit}
            resolver={yupResolver(signUpSchema)}
          >
            <div>
              <FormInput name="name" type="text" size="large" label="Name" />
            </div>
            <div>
              <FormInput name="email" type="email" size="large" label="Email" />
            </div>
            <div
              style={{
                margin: "15px 0px",
              }}
            >
              <FormInput
                name="password"
                type="password"
                size="large"
                label="Password"
              />
            </div>
            <CustomButton htmlType="submit">Sign UP</CustomButton>
          </CustomForm>
        </div>
        <div>
          <p>
            Already have an Account? Please{" "}
            <Link href="/login" style={{ fontWeight: "bold" }}>
              Login
            </Link>{" "}
          </p>
        </div>
      </Col>
      <Col sm={12} md={16} lg={10}>
        <Image src={signupImage} width={400} alt="login image" />
      </Col>
    </Row>
  );
};

export default SignUp;
