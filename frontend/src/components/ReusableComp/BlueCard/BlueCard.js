import React from "react";
import "./BlueCard.css";
import GoogleIcon from "../../../images/google.svg";
import { useAuth } from "../../../Contexts/AuthContext";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useUserDetail } from "../../../Contexts/UserContext";

function Bluecard({ Children, text, isLoginPage = false }) {
  const { signInWithGoogle } = useAuth();

  const toast = useToast();

  const { fetchDetails } = useUserDetail();
  const history = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const userAuth = await signInWithGoogle();
      toast({
        description: "Signed in Succesfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      const userDoc = await fetchDetails("userDetails", userAuth.user.uid);
      if (userDoc._document !== null) {
        history("/home");
      } else {
        history("/userdetails");
      }
    } catch (err) {
      toast({
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  
  return (
    <div
      className={`${
        isLoginPage ? "card-bg-login" : "card-bg-signup"
      } flex flex-col items-center justify-between`}
    >
      <p className="card-text py-12 px-5">{text}</p>
      {Children}

      <h1 className="text-gray-300 mb-4">
        ------------------------or-----------------------
      </h1>
      <div>
        <button
          className="bg-faded-blue text-white  py-3 px-4 rounded-xl inline-flex items-center mb-8 "
          onClick={handleGoogleSignIn}
        >
          <img className="h-6 w-6 mx-2 " src={GoogleIcon} alt="" />
          <span>Sign in With Google</span>
        </button>
      </div>
    </div>
  );
}

export default Bluecard;
