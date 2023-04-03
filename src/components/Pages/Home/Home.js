import { Spinner } from "@chakra-ui/react";
import React from "react";
import { useUserDetail } from "../../../Contexts/UserContext";
import BellIcon from "../../../images/Bell.svg";
import BusFront from "../../../images/BusFront.svg";
import "./Home.css";

function Home() {
  const { values } = useUserDetail();
  return (
    <div>
      <div className="home-card flex flex-col justify-between">
        <div className="w-100 flex justify-between my-3 px-4">
          <p className="text-white tracking-widest">CUSAT</p>
          <img src={BusFront} alt="" />
        </div>
        <div className="w-100 flex justify-center">
          {values ? (
            <p className="text-white tracking-widest text-xl">
              {values.firstName} {values.lastName}
            </p>
          ) : (
            <Spinner color="white" />
          )}
        </div>
        <div className="flex flex-col items-start text-white pl-8 py-3">
          <p>EXPIRY</p>
          <p>01/31</p>
        </div>
      </div>
      <div className="flex mt-8">
        <h1 className="font-mono tracking-widest mr-1 text-lg">
          NOTIFICATIONS
        </h1>
        <img src={BellIcon} alt="" />
      </div>
      <div className="scrollable-div flex flex-col w-100 ">
        <div className="notification-card px-3 py-3 my-3">
          Lorem Ipsum is simply dummy text of the printing and typesetting
        </div>
        <div className="notification-card px-3 py-3 my-3">
          Lorem Ipsum is simply dummy text of the printing and typesetting
        </div>
        <div className="notification-card px-3 py-3 my-3">
          Lorem Ipsum is simply dummy text of the printing and typesetting
        </div>
        <div className="notification-card px-3 py-3 my-3">
          Lorem Ipsum is simply dummy text of the printing and typesetting
        </div>
      </div>
    </div>
  );
}

export default Home;
