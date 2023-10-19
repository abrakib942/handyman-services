"use client";

import Loading from "@/app/Loading";
import CustomForm from "@/components/form/CustomForm";
import FormDatePicker from "@/components/form/FormDatePicker";
import FormInput from "@/components/form/FormInput";
import FormSelectField from "@/components/form/FormSelectField";
import FormTextArea from "@/components/form/FormTextArea";
import CustomButton from "@/components/ui/CustomButton";
import HSBreadCrumb from "@/components/ui/HSBreadCrumb";
import {
  useCreateServiceMutation,
  useGetAllServicesQuery,
} from "@/redux/api/serviceApi";
import { useCreateWorkTypeMutation } from "@/redux/api/workTypeApi";
import { createServiceSchema } from "@/schemas/service";
import { createWorkTypeSchema } from "@/schemas/workType";
import { getUserInfo } from "@/services/auth.service";
import { FileImageOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";

import { Card, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";

const ServiceCreatePage = () => {
  const [createWorkType, { isLoading }] = useCreateWorkTypeMutation();

  const { data } = useGetAllServicesQuery({ limit: 100, page: 1 });

  const { role } = getUserInfo() as any;

  const router = useRouter();

  const serviceData = data?.data;

  const serviceOptions = serviceData?.map((service: any) => {
    return {
      label: service?.title,
      value: service?.id,
    };
  });

  const onSubmit = async (data: any) => {
    try {
      const res: any = await createWorkType({ ...data });
      if (res?.data) {
        message.success("Work Type created successfully!");

        router.push(`/${role}/manage-workType`);
      } else if (res?.error) {
        message.error("Failed to Create. Error:", res?.error?.data?.message);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <HSBreadCrumb
        items={[
          {
            label: "admin",
            link: "/admin",
          },
          {
            label: "manage-workType",
            link: "/admin/manage-workType",
          },
          {
            label: "create",
            link: "/admin/manage-workType/create",
          },
        ]}
      />
      <h1>Create Service</h1>

      <div>
        <CustomForm
          submitHandler={onSubmit}
          resolver={yupResolver(createWorkTypeSchema)}
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
                  label="WorkType Name"
                  required
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
                  type="number"
                  name="price"
                  size="large"
                  label="Price"
                  required
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormTextArea required name="description" label="Description" />
              </Col>

              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormSelectField
                  name="serviceId"
                  size="large"
                  label="Select Service"
                  options={serviceOptions}
                  placeholder="Select"
                  showSearch
                  required
                />
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

export default ServiceCreatePage;
