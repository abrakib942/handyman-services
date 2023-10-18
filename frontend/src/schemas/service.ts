import * as yup from "yup";

export const createServiceSchema = yup.object().shape({
  title: yup.string().required("title is required"),
  heading: yup.string().required("heading is required"),
  description: yup.string().required("description is required"),
});
