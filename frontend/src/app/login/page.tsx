/* eslint-disable react/no-unescaped-entities */
"use client";

import { SubmitHandler } from "react-hook-form";
import { Card, Col, Row, message } from "antd";
import Image from "next/image";
import CustomForm from "@/components/form/CustomForm";
import FormInput from "@/components/form/FormInput";
import loginImage from "@/assets/Login.png";
import CustomButton from "@/components/ui/CustomButton";
import Link from "next/link";
import { useUserLoginMutation } from "@/redux/api/authApi";
import Loading from "../Loading";
import { loginSchema } from "@/schemas/login";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { storeUserInfo } from "@/services/auth.service";

// export const metaData: Metadata = {
//   title: "Handyman | Login",
// };

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const [userLogin, { isLoading }] = useUserLoginMutation();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      const res: any = await userLogin({ ...data });

      if (!!res?.data?.accessToken) {
        message.success({
          content: "Login successful!",
          key: "login-loading",
          duration: 2,
        });
        router.push("/");
      }

      storeUserInfo({ accessToken: res?.data?.accessToken });

      if (res?.error) {
        message.error(res?.error?.data?.message);
      }
    } catch (error: any) {}
  };

  if (isLoading) {
    return <Loading />;
  }

  // if (isSuccess) {
  //   message.success({
  //     content: "successfully logged in!",
  //     key: "login-loading",
  //     duration: 2,
  //   });
  //   router.push("/");
  // }

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        minHeight: "100vh",
      }}
    >
      <Col sm={12} md={16} lg={10}>
        <Card className="w-1/2 h-1/2 flex flex-col gap-0" hoverable>
          <p className="font-bold">admin Credential:</p>
          <p>Email: admin@gmail.com </p>
          <p>pass: 123456</p>
        </Card>
        <Image src={loginImage} width={400} alt="login image" />
      </Col>
      <Col sm={12} md={8} lg={8}>
        <h1
          style={{
            margin: "15px 0px",
          }}
        >
          login your Account
        </h1>
        <div>
          <CustomForm
            submitHandler={onSubmit}
            resolver={yupResolver(loginSchema)}
          >
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
        <div>
          <p>
            Don't have any Account? Please{" "}
            <Link href="/signup" style={{ fontWeight: "bold" }}>
              SignUp
            </Link>{" "}
          </p>
        </div>
      </Col>
    </Row>
  );
};

export default Login;
