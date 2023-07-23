import React, { useEffect, useState } from 'react'
import "./Edit.css";
import {Avatar} from '@chakra-ui/react'
import backarrow from "../../../images/backarrow.svg"
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
  const {fetchDetails,updateDetails} = useUserDetail();
  const {currentUser} = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(()=>{
    async function editDetails(){
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

  useEffect(() => {
    if (data) {
      setFirstname(data?.firstName || '');
      setLastname(data?.lastName || '');
      setPhonenumber(data?.phoneNumber || '');
      setBusnumber(data?.busNumber || '');
    }
  }, [data]);

  const handlesubmit = () => {
    updateDetails("userDetails",firstname,lastname,phonenumber,busnumber);
    history("/account")
    window.location.reload()
  };

  return (
    <div className='blue-card flex flex-col justify-center pb-8'>
      <div className='flex pl-5 pb-7'>
        <img src={backarrow} alt={"back"} onClick={()=>history("/account")}></img>
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
            onChange={(e)=>setFirstname(e.target.value)}
            />
        </div>
        <div className='input-field'>
          <input 
            id="lastname"
            className='align'
            type='text' 
            placeholder='Change Last Name'
            value={lastname}
            onChange={(e)=>setLastname(e.target.value)}
            />
        </div>
        <div className='input-field'>
          <input 
            id="phonenumber"
            className='align'
            type='text' 
            placeholder='Change Phone Number'
            value={phonenumber}
            onChange={(e)=>setPhonenumber(e.target.value)}
            />
        </div>
        <div className='input-field'>
          <input 
            id="busnumber"
            className='align'
            type='text' 
            placeholder='Change Bus Number'
            value={busnumber}
            onChange={(e)=>setBusnumber(e.target.value)}
            />
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

  )
}

export default Edit
