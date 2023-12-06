import * as Yup from "yup";
export const userValidationSchema = Yup.object().shape({
  name: Yup.string().required("name is required"),
  email: Yup.string().required("email is required").email("please provide a valid email"),
  title: Yup.string().required("title is required"),
  role: Yup.string().required("role is required")
});