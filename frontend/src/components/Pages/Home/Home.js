import { Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useUserDetail } from "../../../Contexts/UserContext";
import BellIcon from "../../../images/Bell.svg";
import BusFront from "../../../images/BusFront.svg";
import "./Home.css";

function Home() {
  const [data, setData] = useState(null);
  const { values, fetchDetails } = useUserDetail();

  useEffect(() => {
    async function notifidetails() {
      try {
        const res = await fetchDetails("notifications", values?.busNumber);
        console.log(res.data());
        setData(res.data().text);
      } catch (error) {
        console.log(error.message);
      }
    }
    notifidetails();
  }, [values]);

  return (
    <div>
      <div className="home-card flex flex-col justify-between">
        <div className="w-100 flex justify-between my-3 px-4">
          <p className="text-white tracking-widest">CUSAT</p>
          <img src={BusFront} alt="" />
        </div>
        <div className="w-100 flex justify-center">
          {values ? (
            <p className="text-white tracking-widest text-xl">
              {values.firstName} {values.lastName}
            </p>
          ) : (
            <Spinner color="white" />
          )}
        </div>
        <div className="flex flex-col items-start text-white pl-8 py-3">
          <p>EXPIRY</p>
          <p>01/31</p>
        </div>
      </div>
      <div className="flex mt-8">
        <h1 className="font-mono tracking-widest mr-1 text-lg">
          NOTIFICATIONS
        </h1>
        <img src={BellIcon} alt="" />
      </div>
      <div className="scrollable-div flex flex-col w-100 mb-24 ">
        <div className="flex justify-center h-full items-center">
          {data === null ? (
            <Spinner className="mt-5" color="blue" />
          ) : (
            <div>
              {data?.length === 0 && (
                <p className="pt-20 font-mono font-light text-lg text-black">No Notifications!</p>
              )}
              {data?.map((val, index) => (
                <div
                  key={index}
                  className="notification-card px-3 py-3 my-3 text-lg font-semibold tracking-wider">
                  {val}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
