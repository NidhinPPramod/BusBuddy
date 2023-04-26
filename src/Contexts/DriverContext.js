import { createContext, useContext, useState } from "react";
import { db } from "../Firebase/config";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";


const DriverContext = createContext({
  latlng: null,
  isOn: null,
  driverlatlng:null,
  setOn: () => Function,
  getDriverCoordinates: () => Function,
  checkDriver: () => Promise,
  fetchlocDetails: () => Promise,
  addDetails: () => Function,
});

export const useDriverDetail = () => useContext(DriverContext);

export default function DriverContextProvider({ children }) {

  const [latlng, setLatLng] = useState(null);
  const [driverlatlng, setdriverLatLng] = useState(null);
  const [isOn, setOn] = useState(null);


  const BusUid = [
    "nvAaPUkdMJSi1k5FQ5ixC9G6Jg63",
    "fL7Q76PPF3Mh1Q7G2Wm1PNp28by1",
    "P8XuDJwMrAgjpK5WWAGIC06PH7Z2",
  ];

  async function getDriverCoordinates() {
    await navigator.geolocation.watchPosition((pos) => {
      const coord = [pos.coords.latitude, pos.coords.longitude];
      console.log(coord);
      setLatLng(coord);
      setOn(true);
    });
  }

  function addDetails(collectionRef, userid) {
    setDoc(doc(db, collectionRef, userid), {
      latitude: latlng[0],
      longitude: latlng[1],
    });
  }

  async function fetchlocDetails(busno) {
    try {
       console.log(busno);
      const q = query(
        collection(db, "locations"),
        where("busNumber", "==", busno)
      );
      const docSnap = await getDocs(q);
      console.log("reach");
      docSnap.forEach((doc)=>{
       const locdata=[doc.data().latitude,doc.data().longitude]
        setdriverLatLng(locdata)
      })
    } catch (error) {
      console.log(error.message);
    }
  }

  function checkDriver(uid) {
    const found = BusUid.some((element) => {
      if (element === uid) {
        return true;
      } else {
        return false;
      }
    });
    return found;
  }

  //   function addDetails(collectionRef, data) {
  //     return setDoc(doc(db, collectionRef, `${currentUser.uid}`), {
  //       id: currentUser.uid.slice(0, 5),
  //       ...data,
  //     });
  //   }

  const value = {
    latlng,
    isOn,
    setOn,
    driverlatlng,
    fetchlocDetails,
    getDriverCoordinates,
    checkDriver,
    addDetails,
  };

  return (
    <DriverContext.Provider value={value}>{children}</DriverContext.Provider>
  );
}
