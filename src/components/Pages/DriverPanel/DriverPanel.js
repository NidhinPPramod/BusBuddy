import React from "react";
import GearIcon from "../../../images/gear.svg";
import BellIcon from "../../../images/Bell.svg";
import { Avatar, Switch } from "@chakra-ui/react";
import "./DriverPanel.css";

function DriverPanel() {
  return (
    <div className="blue-card flex flex-col items-center mb-28 px-2 py-2 text-white">
      <div className="flex  justify-end w-100 mr-8 my-2">
        <img src={GearIcon} alt="" />
      </div>
      <div className="flex flex-col items-center justify-center">
        <Avatar size="lg" className="mb-6" />
        <p className="text-lg tracking-widest">NIDHIN P PRAMOD</p>
      </div>
      <div className="flex justify-between items-center w-100 mt-6 px-3 bg-faded-blue py-3 rounded-2xl ">
        <h1 className="text-lg">Location</h1>
        <Switch size="lg" colorScheme="red" />
      </div>
      <div className="flex text-black w-100 mt-3 px-3">
        <h1 className="font-mono tracking-widest mr-1 text-lg">
          NOTIFICATIONS
        </h1>
        <img src={BellIcon} alt="" />
      </div>
      <div className="scroll flex flex-col w-100 ">
        <div className="notifi px-3 py-3 my-3">
          Lorem Ipsum is simply dummy text of the printing and typesetting
        </div>
        <div className="notifi px-3 py-3 my-3">
          Lorem Ipsum is simply dummy text of the printing and typesetting
        </div>
        <div className="notifi px-3 py-3 my-3">
          Lorem Ipsum is simply dummy text of the printing and typesetting
        </div>
        <div className="notifi px-3 py-3 my-3">
          Lorem Ipsum is simply dummy text of the printing and typesetting
        </div>
      </div>
    </div>
  );
}

export default DriverPanel;
