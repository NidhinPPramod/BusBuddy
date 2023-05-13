import React from "react";
import "./BlueCard.css";
import GoogleIcon from "../../../images/google.svg";
import { useAuth } from "../../../Contexts/AuthContext";
import { useToast } from "@chakra-ui/react";

function Bluecard({ Children, text, isLoginPage = false }) {
  const { signInWithGoogle } = useAuth();

  const toast = useToast();

  return (
    <div
      className={`${
        isLoginPage ? "card-bg-login" : "card-bg-signup"
      } flex flex-col items-center justify-between`}>
      <p className="card-text py-12 px-5">{text}</p>
      {Children}

      <h1 className="text-gray-300 mb-4">
        ------------------------or-----------------------
      </h1>
      <div>
        <button
          className="bg-faded-blue text-white  py-3 px-4 rounded-xl inline-flex items-center mb-8 "
          onClick={() =>
            signInWithGoogle()
              .then((response) => {
                console.log(response);
                toast({
                  description: "Signed in Succesfully!",
                  status: "success",
                  duration: 3000,
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
          }>
          <img className="h-6 w-6 mx-2 " src={GoogleIcon} alt="" />
          <span>Sign in With Google</span>
        </button>
      </div>
    </div>
  );
}

export default Bluecard;
