import * as yup from "yup";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const busno=["01","02","03"]

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

export const userDetailSchema = yup.object({
  firstName: yup.string().required("This field is required!"),
  lastName: yup.string().required("This field is required!"),
  phoneNumber: yup.string().min(10).max(10).required("This field is required!").matches(phoneRegExp,"Phone number is not valid!"),
  busNumber: yup.string().required("This field is required!").oneOf(busno,"Enter a valid bus number!"),
  destination: yup.string().required("This field is required!"), 
});

