import React, { useEffect, useState } from 'react';
import "./Edit.css";
import { Avatar, useToast } from '@chakra-ui/react';
import backarrow from "../../../images/backarrow.svg";
import { useUserDetail } from "../../../Contexts/UserContext";
import { useAuth } from "../../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import ImageCropper from "../../Utils/ImageCrop/ImageCropper";

function Edit() {
  const [data, setData] = useState(null);
  const { fetchDetails, updateDetails } = useUserDetail();
  const { currentUser } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  useEffect(() => {
    async function editDetails() {
      const res = await fetchDetails("userDetails", currentUser.uid);
      setData(res.data());
    }
    editDetails();
  }, [currentUser]);

  const history = useNavigate();

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [busnumber, setBusnumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [busNumberError, setBusNumberError] = useState('');

  useEffect(() => {
    if (data) {
      setFirstname(data?.firstName || '');
      setLastname(data?.lastName || '');
      setPhonenumber(data?.phoneNumber || '');
      setBusnumber(data?.busNumber || '');
    }
  }, [data]);

  const validatePhoneNumber = (number) => {
    const phoneNumberRegex = /^\d{10}$/;
    return phoneNumberRegex.test(number);
  };

  const validateBusNumber = (number) => {
    const busNumberRegex = /^(0[1-3])$/;
    return busNumberRegex.test(number);
  };

  const handlesubmit = async () => {
    if (!validatePhoneNumber(phonenumber)) {
      setPhoneNumberError('Phone number should be 10 digits');
      return;
    } else {
      setPhoneNumberError('');
    }

    if (!validateBusNumber(busnumber)) {
      setBusNumberError('Bus number should be 01, 02, or 03');
      return;
    } else {
      setBusNumberError('');
    }

    await updateDetails("userDetails", firstname, lastname, phonenumber, busnumber);
    history("/account");
    window.location.reload();
  };

  return (
    <div className='blue-card flex flex-col justify-center pb-8'>
      <div className='flex pl-5 pb-7'>
        <img src={backarrow} alt={"back"} onClick={() => history("/account")}></img>
      </div>
      <div className='flex flex-col items-center justify-center'>
        {data?.ImageUrl ? <Avatar src={data.ImageUrl} size="lg" /> :
          <Avatar size="lg"></Avatar>
        }
        <p className='Edit-profile' onClick={onOpen}>Change Profile Photo</p>
      </div>
      <div className='flex flex-col items-center justify-center'>
        <div>
          <form className='field-box'>
            <div className='input-field'>
              <input
                id="firstname"
                className='align'
                type='text'
                placeholder='Change First Name'
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div className='input-field'>
              <input
                id="lastname"
                className='align'
                type='text'
                placeholder='Change Last Name'
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            <div className='input-field'>
              <input
                id="phonenumber"
                className='align'
                type='text'
                placeholder='Change Phone Number'
                value={phonenumber}
                onChange={(e) => setPhonenumber(e.target.value)}
              />
              {phoneNumberError && <p className="text-sm text-white font-mono tracking-widest mt-1">{phoneNumberError}</p>}
            </div>
            <div className='input-field'>
              <input
                id="busnumber"
                className='align'
                type='text'
                placeholder='Change Bus Number'
                value={busnumber}
                onChange={(e) => setBusnumber(e.target.value)}
              />
              {busNumberError && <p className="text-sm text-white font-mono  tracking-widest mt-1">{busNumberError}</p>}
            </div>
          </form>
        </div>
        <div className='bg-faded-blue px-2 py-2 w-50 text-white rounded-lg items-center text-center mt-8'>
          <button type='Submit' onClick={handlesubmit}>Update Change</button>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="xs">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="text-center">Profile Picture</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={12} className="flex items-center justify-center">
            <ImageCropper />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Edit;
