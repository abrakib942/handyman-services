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
  useGetSingleServiceQuery,
  useUpdateServiceMutation,
} from "@/redux/api/serviceApi";
import {
  useGetSingleTypeQuery,
  useUpdateWorkTypeMutation,
} from "@/redux/api/workTypeApi";
import { createServiceSchema } from "@/schemas/service";
import { getUserInfo } from "@/services/auth.service";
import { FileImageOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";

import { Card, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";

const EditServicePage = ({ params }: any) => {
  const [updateWorkType, { isLoading }] = useUpdateWorkTypeMutation();

  const { data } = useGetSingleTypeQuery(params?.id);

  const { data: serviceD } = useGetAllServicesQuery({ limit: 100, page: 1 });

  const { role } = getUserInfo() as any;

  const router = useRouter();

  const serviceData = serviceD?.data;

  const serviceOptions = serviceData?.map((service: any) => {
    return {
      label: service?.title,
      value: service?.id,
    };
  });

  const onSubmit = async (data: any) => {
    try {
      const res: any = await updateWorkType({ id: params?.id, data: data });

      if (res?.data) {
        message.success("WorkType updated successfully!");

        router.push(`/${role}/manage-workType`);
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
    description: data?.description || "",
    price: data?.price || "",
    serviceId: data?.serviceId || "",
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
            label: "manage-workType",
            link: "/admin/manage-workType",
          },
          {
            label: "edit",
            link: "/admin/manage-workType/edit",
          },
        ]}
      />
      <h1>Edit WorkType : {data?.title} </h1>

      <div>
        <CustomForm submitHandler={onSubmit} defaultValues={defaultValues}>
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
              WorkType Information
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
                  type="float"
                  name="price"
                  size="large"
                  label="Price"
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

          <CustomButton htmlType="submit">Edit</CustomButton>
        </CustomForm>
      </div>
    </div>
  );
};

export default EditServicePage;
