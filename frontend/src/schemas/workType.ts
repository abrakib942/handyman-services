import * as yup from "yup";

export const createWorkTypeSchema = yup.object().shape({
  title: yup.string().required("title is required"),
  description: yup.string().required("description is required"),
  price: yup.number().required("description is required"),
  serviceId: yup.string().required("service is required"),
});
