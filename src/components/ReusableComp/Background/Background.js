import React from "react";
import "./Background.css";
import BusLogo from "../../../images/Buslogo.svg";

function Background({ Children,bottomcomponent,navbar }) {
  return (
    <div className="background  flex flex-col items-center justify-between ">
      <img className="h-16 w-32 my-8" src={BusLogo} alt="" />
      {Children}
      {bottomcomponent}
      {navbar}
    </div>
  );
}

export default Background;
