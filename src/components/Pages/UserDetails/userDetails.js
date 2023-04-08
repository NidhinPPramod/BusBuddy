import { useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useUserDetail } from "../../../Contexts/UserContext";
import { userDetailSchema } from "../../../Schemas/index";
import "./userDetails.css";

const initialValues = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  busNumber: "",
  destination: "",
};

function UserDetails() {
  const history = useNavigate();
  const { addDetails } = useUserDetail();

  const toast = useToast();

  const { values, errors, handleChange, handleBlur, touched } = useFormik({
    initialValues: initialValues,
    validationSchema: userDetailSchema,
  });

  const submitDetails = (e) => {
    e.preventDefault();
    const data = {
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: values.phoneNumber,
      busNumber: values.busNumber,
      destination: values.destination,
    };

    const collRefid = "userDetails";

    addDetails(collRefid, data)
      .then(() => {
        toast({
          description: "Details Added Successfully!!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        history("/home");
        window.location.reload()
      })
      .catch((err) => {
        toast({
          description: err.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <div className="user-card  flex flex-col px-3 overflow-auto ">
      <h1 className="mt-3 text-lg font-bold font-mono">Enter User Details</h1>
      <div>
        <form id="form1" onSubmit={submitDetails}>
          <input
            className="w-100 rounded-2xl h-12 mt-3 px-2 "
            placeholder="First Name"
            type="text"
            name="firstName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.firstName}
            required
          />
          {errors.firstName && touched.firstName ? (
            <p className="text-sm text-white font-normal tracking-widest mt-1">
              {errors.firstName}
            </p>
          ) : null}
          <input
            className="w-100 rounded-2xl h-12 mt-3 px-2"
            placeholder="Last Name"
            type="text"
            name="lastName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.lastName}
            required
          />
          {errors.lastName && touched.lastName ? (
            <p className="text-sm text-white font-normal tracking-widest mt-1">
              {errors.lastName}
            </p>
          ) : null}
          <input
            className="w-100 rounded-2xl h-12 mt-3 px-2"
            placeholder="Phone Number"
            type="text"
            name="phoneNumber"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.phoneNumber}
            required
          />
          {errors.phoneNumber && touched.phoneNumber ? (
            <p className="text-sm text-white font-normal tracking-widest mt-1">
              {errors.phoneNumber}
            </p>
          ) : null}
          <input
            className="w-100 rounded-2xl h-12 mt-3 px-2"
            placeholder="Bus Number"
            type="text"
            name="busNumber"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.busNumber}
            required
          />
          {errors.busNumber && touched.busNumber ? (
            <p className="text-sm text-white font-normal tracking-widest mt-1">
              {errors.busNumber}
            </p>
          ) : null}
          <input
            className="w-100 rounded-2xl h-12 mt-3 px-2"
            placeholder="Destination"
            type="text"
            name="destination"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.destination}
            required
          />
          {errors.destination && touched.destination ? (
            <p className="text-sm text-white font-normal tracking-widest mt-1">
              {errors.destination}
            </p>
          ) : null}
        </form>
        <div className="w-100 h-28  mt-8  border-dashed border-2 rounded-2xl flex flex-col mb-24">
          <p className="text-lg mx-3 my-2 font-medium">Upload Image:</p>
          <div className="w-64 h-8 border-dashed border-2 rounded-2xl flex items-center justify-center ml-9 py-3 mb-2">
            <button className="text-white text-base">Choose File</button>
          </div>
          <button
            className="bg-faded-blue text-white rounded-xl px-5 py-2 text-lg mt-5 "
            type="submit"
            form="form1">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
