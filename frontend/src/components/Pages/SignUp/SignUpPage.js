import React from "react";
import Background from "../../ReusableComp/Background/Background";
import Bluecard from "../../ReusableComp/BlueCard/BlueCard";
import SignUp from "./SignUp";
import { Link } from "react-router-dom";

function SignUpPage() {
  return (
    <>
      <Background
        Children={
          <Bluecard
            Children={<SignUp />}
            text={"Travel with ease,SIGN UP with Bus Buddy today."}
          />
        }
        isSignUp={"true"}
        bottomcomponent={
          <p className="text-xl py-4">
            Already a User?
            <Link className="font-mono underline" to="/login">
              Login
            </Link>
          </p>
        }
      />
    </>
  );
}

export default SignUpPage;
