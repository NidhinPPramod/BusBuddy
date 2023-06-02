import { createContext, useContext, useState } from "react";
import { db } from "../Firebase/config";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

const DriverContext = createContext({
  latlng: null,
  isOn: false,
  driverlatlng: null,
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
  const [isOn, setOn] = useState(false);

  const BusUid = [
    "nvAaPUkdMJSi1k5FQ5ixC9G6Jg63",
    "fL7Q76PPF3Mh1Q7G2Wm1PNp28by1",
    "P8XuDJwMrAgjpK5WWAGIC06PH7Z2",
  ];

  async function getDriverCoordinates() {
    try {
      const successHandler = function(pos) {
        const coord = [pos.coords.latitude, pos.coords.longitude];
        setLatLng(coord)
        setOn(true)
      };
      const errorHandler = function (errorObj) {
        alert(errorObj.code + ": " + errorObj.message);
      };
      navigator.geolocation.watchPosition(successHandler,errorHandler,{enableHighAccuracy:true,maximumAge:10000})
    } catch (error) {
      console.log(error.message);
    }
  }

  async  function  addDetails(collectionRef, userid) {
    if (latlng?.[0] && latlng?.[1]) {
      await updateDoc(doc(db, collectionRef, userid), {
        latitude: latlng[0],
        longitude: latlng[1],
      });
    }
  }

  async function fetchlocDetails(busno) {
    try {
      const q = query(
        collection(db, "locations"),
        where("busNumber", "==", busno)
      );
      const docSnap = await getDocs(q);
      docSnap.forEach((doc) => {
        const locdata = [doc.data().latitude, doc.data().longitude];
        setdriverLatLng(locdata);
      });
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
