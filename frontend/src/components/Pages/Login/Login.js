import React, { useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { UserCircleIcon, KeyIcon } from "@heroicons/react/24/solid";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { logInSchema } from "../../../Schemas/index";
import { useToast } from "@chakra-ui/react";
import { useAuth } from "../../../Contexts/AuthContext";
import { useUserDetail } from "../../../Contexts/UserContext";
import { useDriverDetail } from "../../../Contexts/DriverContext";

const initialValues = {
  email: "",
  password: "",
  resetEmail: "",
};

function Login() {
  const { fetchDetails } = useUserDetail();
  const history = useNavigate();

  const initialRef = useRef(null);

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { login, forgotPassword } = useAuth();
  const { checkDriver } = useDriverDetail();

  const { values, errors, handleChange, handleBlur, touched } = useFormik({
    initialValues: initialValues,
    validationSchema: logInSchema,
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userAuth = await login(values.email, values.password);
      toast({
        description: "User Logged in Succesfully!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      
      if (await checkDriver(userAuth.user.uid)) {
        history("/driverpanel");
        return;
      }
      const userDoc = await fetchDetails("userDetails", userAuth.user.uid);
      if (userDoc._document !== null) {
        history("/home");
      } else {
        history("/userdetails");
      }
    } catch (error) {
      toast({
        description: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    forgotPassword(values.resetEmail)
      .then(() => {
        toast({
          description: `An email is sent to ${values.resetEmail} for password reset instructions.`,
          status: "info",
          duration: 6000,
          isClosable: true,
        });
        initialRef.current.value = "";
      })
      .catch((err) => {
        toast({
          description: err.message,
          status: "error",
          duration: 6000,
          isClosable: true,
        });
      });
  };

  return (
    <div className="flex flex-col items-center text-left ">
      <form className="flex flex-col items-center " onSubmit={handleLogin}>
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
          <p className="text-white text-xs font-mono">{errors.password}</p>
        ) : null}
        <span className="flex w-100 " onClick={onOpen}>
          <p className="text-blcak ml-2 mt-1 font-sans font-medium">
            Forgot password?
          </p>
        </span>
        <button
          className="bg-faded-blue text-white py-2 px-4 rounded-lg mt-4 "
          type="submit">
          SignIn
        </button>
      </form>

      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="scale"
        size={"xs"}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Forgot Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} className="bg-creamish">
            <form onSubmit={handleResetPassword}>
              <label className="font-mono">Enter Email</label>
              <br />
              <input
                className="w-100 px-2 py-2"
                ref={initialRef}
                type="email"
                name="resetEmail"
                value={values.resetEmail}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              ̥
              {errors.resetEmail && touched.resetEmail ? (
                <p className="text-red-600 text-xs font-mono">
                  {errors.resetEmail}
                </p>
              ) : null}
              <button
                className="bg-faded-blue text-white py-2 px-4 rounded-lg mt-4 "
                type="submit">
                Submit
              </button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Login;
