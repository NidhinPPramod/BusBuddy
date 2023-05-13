import React from "react";
import Background from "../../ReusableComp/Background/Background";
import Bluecard from "../../ReusableComp/BlueCard/BlueCard";
import Login from "./Login";
import { Link } from "react-router-dom";


function LoginPage() {
  return (
    <>
      <Background
        Children={
          <Bluecard
            Children={<Login />}
            text={"Ready to ride? SIGN IN with Bus Buddy."}
            isLoginPage={true}
          />
        }
        bottomcomponent={
          <p className="text-xl py-4">
            Not a User?
            <Link className="font-mono underline" to="/">
              Register
            </Link>
          </p>
        }
      />
    </>
  );
}

export default LoginPage;
