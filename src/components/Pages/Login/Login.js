import React from "react";
import { UserCircleIcon, KeyIcon } from "@heroicons/react/24/solid";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { logInSchema } from "../../../Schemas/index";
import { useToast } from "@chakra-ui/react";
import { useAuth } from "../../../Contexts/AuthContext";

const initialValues = {
  email: "",
  password: "",
};

function Login() {
  // const history = useNavigate();

  const toast = useToast();

  const { login } = useAuth();

  const { values, errors, handleSubmit, handleChange, handleBlur, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: logInSchema,
      onSubmit: (values, action) => {
        login(values.email, values.password)
          .then((response) => {
            console.log(response);
            toast({
              description: "User Logged in Succesfully!",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
          })
          .catch((err) => {
            toast({
              description: err.message,
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          })
          .finally(() => {
            action.resetForm();
          });
      },
    });

  return (
    <div className="flex flex-col items-center text-left ">
      <form className="flex flex-col items-center " onSubmit={handleSubmit}>
        <div className="relative flex items-center">
          <UserCircleIcon className="w-6 h-6 absolute ml-3" />
          <input
            className="rounded-full my-2 w-60 h-12 text-lg pl-10 "
            type="email"
            placeholder="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {errors.email && touched.email ? (
          <p className="text-white text-xs">{errors.email}</p>
        ) : null}
        <div className="relative flex items-center ">
          <KeyIcon className="w-6 h-6 absolute ml-3" />
          <input
            className="rounded-full my-2 w-60 h-12 text-lg pl-10 "
            type="password"
            placeholder="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {errors.password && touched.password ? (
          <p className="text-white text-xs">{errors.password}</p>
        ) : null}
        <span className="flex w-100 ">
        <p className="text-blcak ml-2 mt-1 font-sans font-medium">Forgot password?</p>
        </span>
        <button
          className="bg-faded-blue text-white py-2 px-4 rounded-lg mt-4 "
          type="submit">
          SignIn
        </button>
      </form>
    </div>
  );
}

export default Login;
