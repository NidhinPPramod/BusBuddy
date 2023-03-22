import * as yup from "yup";

export const signUpSchema = yup.object({
  email: yup.string().email().required("Please enter your email!"),
  password: yup.string().min(6).required("Please enter your password!"),
  confirmPassword: yup
    .string()
    .required("This is a Required field")
    .oneOf([yup.ref("password"), null], "Password Must Match"),
});

export const logInSchema = yup.object({
  email: yup.string().email().required("Please enter your email!"),
  password: yup.string().min(6).required("Please enter your password!"),
  resetEmail:yup.string().email("Must be valid Format").required("Please enter your email!"),
});

