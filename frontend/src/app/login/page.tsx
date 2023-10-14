"use client";

import { Metadata } from "next";
import { SubmitHandler } from "react-hook-form";
import { Button, Col, Row, message } from "antd";
import Image from "next/image";
import CustomForm from "@/components/form/CustomForm";
import FormInput from "@/components/form/FormInput";
import loginImage from "@/assets/Login.png";
import CustomButton from "@/components/CustomButton";

export const metaData: Metadata = {
  title: "Handyman | Login",
};

type FormValues = {
  id: string;
  password: string;
};

const Login = () => {
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      console.log(data);
    } catch (error) {}
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        minHeight: "100vh",
      }}
    >
      <Col sm={12} md={16} lg={10}>
        <Image src={loginImage} width={500} alt="login image" />
      </Col>
      <Col sm={12} md={8} lg={8}>
        <h1
          style={{
            margin: "15px 0px",
          }}
        >
          login your account
        </h1>
        <div>
          <CustomForm submitHandler={onSubmit}>
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
            <CustomButton htmlType="submit">Login</CustomButton>
          </CustomForm>
        </div>
      </Col>
    </Row>
  );
};

export default Login;
