import React, { useEffect } from "react";
import GearIcon from "../../../images/gear.svg";
import BellIcon from "../../../images/Bell.svg";
import {
  Avatar,
  Switch,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Textarea,
} from "@chakra-ui/react";

import "./DriverPanel.css";
import { useDriverDetail } from "../../../Contexts/DriverContext";
import { useAuth } from "../../../Contexts/AuthContext";

function DriverPanel() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getDriverCoordinates, isOn, setOn, addDetails } = useDriverDetail();
  const { currentUser } = useAuth();

  useEffect(() => {
    console.log(isOn);
    if (isOn) {
      addDetails("locations", currentUser.uid);
    }
    return () => {
      setOn(false);
    };
  });

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
        <Switch size="lg" colorScheme="red" onChange={getDriverCoordinates} />
      </div>
      <div className="flex text-black w-100 mt-3 px-3 items-center justify-between">
        <div className="flex items-center">
          <h1 className="font-mono tracking-widest mr-1 text-lg">
            NOTIFICATIONS
          </h1>
          <img src={BellIcon} alt="" />
        </div>
        <div>
          <button
            className="bg-faded-blue text-white py-2 px-4 rounded-lg "
            type="submit"
            onClick={onOpen}>
            POST
          </button>
        </div>
      </div>
      <div className="scroll flex flex-col w-100 justify-center items-center ">
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
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="xs">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Post Notification</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Textarea placeholder="Enter notification!" size="lg" />
          </ModalBody>
          <ModalFooter>
            <div className="flex items-center justify-center w-100">
              <button className="bg-faded-blue px-4 py-2 rounded-md text-white">
                SEND
              </button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default DriverPanel;
