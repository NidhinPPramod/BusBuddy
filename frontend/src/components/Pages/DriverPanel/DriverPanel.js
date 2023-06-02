import React, { useEffect, useState } from "react";
import LogoutIcon from "../../../images/power-off.png";
import BellIcon from "../../../images/Bell.svg";
import { useUserDetail } from "../../../Contexts/UserContext";
import { db } from "../../../Firebase/config";
import {
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
  arrayRemove,
} from "firebase/firestore";
import { CloseIcon } from "@chakra-ui/icons";
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
  Spinner,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import "./DriverPanel.css";
import { useDriverDetail } from "../../../Contexts/DriverContext";
import { useAuth } from "../../../Contexts/AuthContext";

function DriverPanel() {
  const [isLoc, setIsLoc] = useState(false);
  const [postdata, setPostData] = useState("");
  const [data, setData] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getDriverCoordinates, isOn, setOn, addDetails } = useDriverDetail();
  const { fetchDetails } = useUserDetail();
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    async function notifidetails() {
      try {
        const res = await fetchDetails("notifications", generateBusNumber());
        setData(res.data().text);
      } catch (error) {
        console.log(error.message);
      }
    }
    notifidetails();

    if (isLoc) {
      addDetails("locations", currentUser.uid);
    }
  });

  const history = useNavigate();

  const signOut = () => {
    logout();
    history("/login");
    window.location.reload();
  };

  const generateBusNumber = () => {
    if (currentUser.email === "bus01@gmail.com") {
      return "01";
    } else if (currentUser.email === "bus02@gmail.com") {
      return "02";
    } else {
      return "03";
    }
  };

  const generateUsername = () => {
    if (currentUser.email === "bus01@gmail.com") {
      return "BUS 01";
    } else if (currentUser.email === "bus02@gmail.com") {
      return "BUS 02";
    } else {
      return "BUS 03";
    }
  };

  const postNotification = async (element) => {
    setPostData("");
    onClose();
    const docref = doc(db, "notifications", generateBusNumber());
    updateDoc(docref, {
      text: arrayUnion(element),
    });
  };

  const deleteArrayElementByIndex = async (element) => {
    try {
      const docRef = doc(db, "notifications", generateBusNumber());
      await updateDoc(docRef, { text: arrayRemove(element) });
    } catch (error) {
      console.error("Error deleting array element:", error);
    }
  };

  const handleSwitch = () => {
    setIsLoc(!isLoc);
    setOn(!isOn);
    getDriverCoordinates();
  };

  return (
    <div className="blue-card flex flex-col items-center mb-28 px-2 py-2 text-white">
      <div className="flex  justify-end w-100 mr-8 my-2">
        <img src={LogoutIcon} alt="logout" width={24} onClick={signOut} />
      </div>
      <div className="flex flex-col items-center justify-center">
        <Avatar size="lg" className="mb-6" />
        {!currentUser ? (
          <Spinner color="white" />
        ) : (
          <>
            <p className="text-lg tracking-widest">{generateUsername()}</p>
          </>
        )}
      </div>
      <div className="flex justify-between items-center w-100 mt-6 px-3 bg-faded-blue py-3 rounded-2xl ">
        <h1 className="text-lg">Location</h1>
        <Switch size="lg" colorScheme="red" onChange={handleSwitch} />
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
      <div className="scroll flex flex-col w-100 flex-grow items-center">
        {data === null ? (
          <div>
            <Spinner className="mt-5" color="white" />
          </div>
        ) : (
          <div>
            {data?.length === 0 && (
              <p className="pt-20 font-mono font-light">No Notifications!</p>
            )}
            {data?.map((val, index) => (
              <>
                <div
                  key={index}
                  className="notifi px-3 py-3 my-3 text-black text-lg font-semibold tracking-wider">
                  <div className="w-full px-2 flex justify-end">
                    <CloseIcon onClick={() => deleteArrayElementByIndex(val)} />
                  </div>
                  {val}
                </div>
              </>
            ))}
          </div>
        )}
      </div>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="xs">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Post Notification</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Textarea
              placeholder="Enter notification!"
              size="lg"
              value={postdata}
              onChange={(e) => setPostData(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <div className="flex items-center justify-center w-100">
              <button
                className="bg-faded-blue px-4 py-2 rounded-md text-white"
                onClick={() => postNotification(postdata)}>
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
