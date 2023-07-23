import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Contexts/AuthContext";
import "./Account.css";
import PenIcon from "../../../images/pen.svg";
import DocIcon from "../../../images/document.svg";
import CashIcon from "../../../images/cash.svg";
import { useUserDetail } from "../../../Contexts/UserContext";
import { Avatar, Skeleton, SkeletonCircle, useToast, Modal, ModalBody, useDisclosure, ModalFooter, ModalCloseButton, ModalHeader, ModalContent, ModalOverlay, Textarea } from "@chakra-ui/react";
import PaidIcon from "../../../images/PaidIcon.svg"
import axios from "axios";


function Account() {
  const [isPayed, setIsPayed] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [feedback, setFeedback] = useState("")

  const { logout, currentUser } = useAuth();
  const { fetchDetails, postfeedback } = useUserDetail()

  const toast = useToast();

  const history = useNavigate();

  useEffect(() => {
    async function paymentDetails() {
      try {
        const res = await fetchDetails("userDetails", currentUser?.uid);
        const pay = res.data()?.Paymentdetails?.isPayed;
        setIsPayed(pay);
      } catch (error) {
        console.log(error.message);
      }
    }
    paymentDetails();
  },);

  const signOut = () => {
    logout();
    history("/login");
    window.location.reload();
  };

  const { values } = useUserDetail();

  const checkoutHandler = async (amount) => {
    if (isPayed) {
      toast({
        description: "You have already paid for this month",
        status: "warning",
        duration: 5000,
        isClosable: true,
      })
      return;
    }
    const {
      data: { key },
    } = await axios.get("https://busbuddybackend.onrender.com/api/getkey");

    const {
      data: { order },
    } = await axios.post("https://busbuddybackend.onrender.com/api/checkout", {
      amount, uid: currentUser.uid,
    });

    const options = {
      key, // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "BusBuddy",
      description: "MontlyPayment",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: "https://busbuddybackend.onrender.com/api/paymentverification",
      prefill: {
        name: "",
        email: "",
        contact: "",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#121212",
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
  };

  const postFeedbacks = async (data) => {
    await postfeedback(data)
    toast({
      description: "Feedback Posted Succesfully!",
      status: "success",
      duration: 5000,
      isClosable: true,
    })
    onClose()
  }

  return (
    <div className="account-card flex flex-col items-center mb-36 px-2 py-2 gap-2">
      <div className="flex w-100 px-2 py-4 my-3 justify-center items-center">
        <div className="mr-5 h-16 w-16">
          {values ? (
            <Avatar src={values.ImageUrl} size="lg" />
          ) : (
            <SkeletonCircle size="20" />
          )}
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
        <div
          className="bg-faded-blue rounded-full h-20 w-20 flex justify-center items-center cursor-pointer"
          onClick={() => checkoutHandler(80)}>
          <img src={CashIcon} alt="" className="h-13 w-13 " />
        </div>
        <div
          className="bg-faded-blue rounded-full h-20 w-20 flex justify-center items-center cursor-pointer"
          onClick={() => history("/edit")}>
          <img src={PenIcon} alt="" className="h-8 w-8 " />
        </div>
        <div className="bg-faded-blue rounded-full h-20 w-20 flex justify-center items-center cursor-pointer "
        onClick={onOpen}>
          <img src={DocIcon} alt="" className="h-8 w-8 " />
        </div>
      </div>
      <div className="flex w-100 justify-around mt-2 text-white tracking-wide font-bold">
        <p>Pay Now!</p>
        <p>Edit Profile</p>
        <p>Feedback</p>
      </div>
      {!values?.Paymentdetails?.isPayed ? <div>
        <div className="price text-white text-8xl flex justify-center items-center mt-4 font-black mb-3">
          <p>₹80</p>
        </div>
        <div className="warning-card flex justify-center items-center text-yellow-300 tracking-widest font-mono font-medium mt-3">
          <p>Bill yet to be paid!</p>
        </div>
      </div> : <div className="flex flex-col items-center mt-4">
        <img src={PaidIcon} height="84px" width="84px" alt="paidicon" />

        <div className="warning-card flex justify-center items-center text-green-500 tracking-widest font-mono font-medium mt-3">
          <p>Paid Successfully!</p>
        </div>
      </div>}
      <div className="flex-grow items-end flex pb-4">
        <button
          className="bg-faded-blue text-white rounded-xl px-5 py-2 text-lg mt-4 "
          onClick={signOut}>
          LogOut
        </button>
      </div>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="xs">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Post FeedBack</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Textarea
              placeholder="Enter Feedback!"
              size="lg"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <div className="flex items-center justify-center w-100">
              <button
                className="bg-faded-blue px-4 py-2 rounded-md text-white"
                onClick={() => postFeedbacks(feedback)}>
                SEND
              </button>
            </div>
          </ModalFooter>
        </ModalContent>

      </Modal>

    </div>
  );
}

export default Account;
