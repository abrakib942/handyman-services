"use client";

import Loading from "@/app/Loading";
import CustomForm from "@/components/form/CustomForm";
import FormDatePicker from "@/components/form/FormDatePicker";
import FormInput from "@/components/form/FormInput";
import FormTextArea from "@/components/form/FormTextArea";
import CustomButton from "@/components/ui/CustomButton";
import HSBreadCrumb from "@/components/ui/HSBreadCrumb";
import {
  useCreateServiceMutation,
  useGetSingleServiceQuery,
  useUpdateServiceMutation,
} from "@/redux/api/serviceApi";
import { createServiceSchema } from "@/schemas/service";
import { getUserInfo } from "@/services/auth.service";
import { FileImageOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";

import { Card, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";

const EditServicePage = ({ params }: any) => {
  const [updateService, { isLoading }] = useUpdateServiceMutation();

  const { data } = useGetSingleServiceQuery(params?.id);

  console.log("sing", data);

  const { role } = getUserInfo() as any;

  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      const res: any = await updateService({ id: params?.id, data: data });
      if (res?.data) {
        message.success("Service updated successfully!");

        router.push(`/${role}/manage-service`);
      } else if (res?.error) {
        message.error(res?.error?.data?.message);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  const defaultValues = {
    title: data?.title || "",
    heading: data?.heading || "",
    description: data?.description || "",
  };

  return (
    <div>
      <HSBreadCrumb
        items={[
          {
            label: "admin",
            link: "/admin",
          },
          {
            label: "manage-service",
            link: "/admin/manage-service",
          },
        ]}
      />
      <h1>Edit Service :{} </h1>

      <div>
        <CustomForm
          submitHandler={onSubmit}
          defaultValues={defaultValues}
          resolver={yupResolver(createServiceSchema)}
        >
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
              marginBottom: "10px",
            }}
          >
            <p
              style={{
                fontSize: "18px",
                marginBottom: "10px",
              }}
            >
              Service Information
            </p>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="title"
                  size="large"
                  label="Service Name"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="heading"
                  size="large"
                  label="heading"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormTextArea name="description" label="Description" />
              </Col>

              <Col
                className="gutter-row"
                span={5}
                style={{
                  marginBottom: "10px",
                }}
              >
                <Card className="w-[140px] cursor-pointer">
                  <FileImageOutlined
                    style={{
                      fontSize: "80px",
                      color: "gray",
                    }}
                  />
                </Card>
              </Col>
            </Row>
          </div>

          <CustomButton htmlType="submit">Create</CustomButton>
        </CustomForm>
      </div>
    </div>
  );
};

export default EditServicePage;
