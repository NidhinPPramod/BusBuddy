import React from "react";
import "./Background.css";
import BusLogo from "../../../images/Buslogo.svg";

function Background({ Children,bottomcomponent }) {
  return (
    <div className="background flex flex-col items-center">
      <img className="h-16 w-32 my-8 " src={BusLogo} alt="" />
      {Children}
      {bottomcomponent}
    </div>
  );
}

export default Background;
