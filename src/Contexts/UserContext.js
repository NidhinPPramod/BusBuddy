import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../Firebase/config";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useAuth } from "./AuthContext";

const UserContext = createContext({
  values: null,
  addDetails: () => Promise,
  fetchDetails: () => Promise,
  updateDetails: () => Promise,
});

export const useUserDetail = () => useContext(UserContext);

export default function UserContextProvider({ children }) {
  const { currentUser } = useAuth();
  const [values, setValues] = useState();

  useEffect(() => {
    if (currentUser != null) {
      fetchDetails("userDetails", currentUser.uid).then((res) => {
        setValues(res.data());
      });
    }
  }, [currentUser]);

  function addDetails(collectionRef, data) {
    return setDoc(doc(db, collectionRef, `${currentUser.uid}`), {
      id: currentUser.uid.slice(0, 5),
      ...data,
    });
  }

  function fetchDetails(collectionRef, docId) {
    return getDoc(doc(db, collectionRef, docId));
  }
  function updateDetails(collectionRef, data) {}

  const value = { values, addDetails, fetchDetails, updateDetails };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
