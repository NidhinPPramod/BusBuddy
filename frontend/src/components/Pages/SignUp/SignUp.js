import React from "react";
import { UserCircleIcon, KeyIcon } from "@heroicons/react/24/solid";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { signUpSchema } from "../../../Schemas/index";
import { useToast } from "@chakra-ui/react";
import { useAuth } from "../../../Contexts/AuthContext";

const initialValues = {
  email: "",
  password: "",
  confirmPassword: "",
};

function SignUp() {
  const history = useNavigate();

  const toast = useToast();

  const { register } = useAuth();

  const { values, errors, handleSubmit, handleChange, handleBlur, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,
      onSubmit: (values, action) => {
        register(values.email, values.password).then(() => {
          toast({
            description: "User Registered Succesfully!",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          history("/login")
        }).catch((err)=>{
          toast({
            description:err.message,
            status:"error",
            duration:3000,
            isClosable:true,
          })
        }).finally(()=>{
          action.resetForm();
        });
      },
    });

  return (
    <div className="flex flex-col items-center justify-center ">
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
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
          <p className="text-white text-xs font-mono">{errors.email}</p>
        ) : null}
        <div className="relative flex items-center">
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
          <p className="text-white text-xs font-mono">{errors.password}</p>
        ) : null}
        <div className="relative flex items-center">
          <KeyIcon className="w-6 h-6 absolute ml-3" />
          <input
            className="rounded-full my-2 w-60 h-12 text-lg pl-10 "
            type="password"
            placeholder="ConfirmPassword"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {errors.confirmPassword && touched.confirmPassword ? (
          <p className="text-white text-xs font-mono">{errors.confirmPassword}</p>
        ) : null}
        <button
          className="bg-faded-blue text-white py-2 px-4 rounded-lg my-4 "
          type="submit">
          SignUp
        </button>
      </form>
    </div>
  );
}

export default SignUp;
