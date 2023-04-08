import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Contexts/AuthContext";
import "./Account.css";
import { Avatar } from "@chakra-ui/react";
import PenIcon from "../../../images/pen.svg";
import DocIcon from "../../../images/document.svg";
import CashIcon from "../../../images/cash.svg";
import { useUserDetail } from "../../../Contexts/UserContext";
import { Skeleton} from "@chakra-ui/react";

function Account() {
  const { logout} = useAuth();

  const history=useNavigate()

  const signOut=()=>{
    logout()
    history("/login")
    window.location.reload()
  }

  const { values } = useUserDetail();

  return (
    <div className="account-card flex flex-col items-center mb-4 px-2 py-2">
      <div className="flex w-100 px-2 py-4 my-3 justify-center items-center">
        <div className="mr-5 h-16 w-16">
          <Avatar size="lg" />
        </div>
        <div className="flex flex-col text-white tracking-widest text-lg ">
          {values ? (
            <p>
              {values.firstName} {values.lastName}
            </p>
          ) : (
            <p className="font-mono">Loading....</p>
          )}
          {values ? <p>ID:{values.id}</p> : <Skeleton height="20px" />}
        </div>
      </div>
      <div className="flex w-100 justify-around">
        <div className="bg-faded-blue rounded-full h-20 w-20 flex justify-center items-center">
          <img src={CashIcon} alt="" className="h-13 w-13 " />
        </div>
        <div className="bg-faded-blue rounded-full h-20 w-20 flex justify-center items-center">
          <img src={PenIcon} alt="" className="h-8 w-8 " />
        </div>
        <div className="bg-faded-blue rounded-full h-20 w-20 flex justify-center items-center ">
          <img src={DocIcon} alt="" className="h-8 w-8 " />
        </div>
      </div>
      <div className="flex w-100 justify-around mt-2 text-white tracking-wide font-bold">
        <p>Pay Now!</p>
        <p>Edit Profile</p>
        <p>Feedback</p>
      </div>
      <div className="price text-white text-8xl flex justify-center items-center mt-4 font-black mb-3">
        <p>₹80</p>
      </div>
      <div className="warning-card flex justify-center items-center text-white tracking-widest font-mono font-medium mt-3">
        <p>Bill yet to be paid!</p>
      </div>
      <button
        className="bg-faded-blue text-white rounded-xl px-5 py-2 text-lg mt-4"
        onClick={signOut}>
        LogOut
      </button>
    </div>
  );
}

export default Account;
