import { createContext, useContext, useEffect, useState } from "react";
import { db, storage } from "../Firebase/config";
import { doc, setDoc, getDoc ,updateDoc} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuth } from "./AuthContext";

const UserContext = createContext({
  values: null,
  setUploading: null,
  isUploading: null,
  setIsUploaded: null,
  isUploaded: null,
  addDetails: () => Promise,
  fetchDetails: () => Promise,
  updateDetails: () => Promise,
  postfeedback: () => Promise,
  ImageUpload: () => Promise,
});

export const useUserDetail = () => useContext(UserContext);

export default function UserContextProvider({ children }) {
  const { currentUser } = useAuth();
  const [values, setValues] = useState();
  const [imageUrl, setImageUrl] = useState();

  const [isUploading, setUploading] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);

  useEffect(() => {
    if (currentUser != null) {
      fetchDetails("userDetails", currentUser.uid).then((res) => {
        setValues(res.data());
      });
    }
  }, [currentUser]);

  async function ImageUpload(blobname) {
    try {
      const response = await fetch(blobname);
      const blob = await response.blob();
      const file = new File([blob], "filename.jpg", { type: blob.type });
      const storageRef = ref(storage, `ppimages/${currentUser.uid}`);
      const success = await uploadBytes(storageRef, file);
      setUploading(false);
      setIsUploaded(true);
      const url=await getDownloadURL(storageRef)
      console.log(url);
      setImageUrl(url)
      console.log(success);
    } catch (error) {
      console.log(error.message);
    }
  }

  function addDetails(collectionRef, data) {
    return setDoc(doc(db, collectionRef, `${currentUser.uid}`), {
      id: currentUser.uid.slice(0, 5),ImageUrl:imageUrl,
      ...data,
    });
  }

  function fetchDetails(collectionRef, docId) {
    return getDoc(doc(db, collectionRef, docId));
  }


  function updateDetails(collectionRef,firstname,lastname,ph_no,bus_no) {
    return setDoc(doc(db, collectionRef,`${currentUser.uid}`), {firstName:firstname,lastName:lastname,phoneNumber:ph_no,busNumber:bus_no,
      },{merge:true}
    );
  }

  function postfeedback(data){
    return setDoc(doc(db,"feedback",`${currentUser.uid}`),{feedback:data});
  }

  const value = {
    values,
    setUploading,
    isUploading,
    isUploaded,
    setIsUploaded,
    addDetails,
    ImageUpload,
    fetchDetails,
    updateDetails,
    postfeedback,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
