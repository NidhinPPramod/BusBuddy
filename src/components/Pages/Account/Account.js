import React, { useEffect } from "react";
import { useAuth } from "../../../Contexts/AuthContext";

function Account() {
  const { logout,currentUser } = useAuth();
  useEffect(()=>{
    console.log(JSON.stringify(currentUser))
  },[currentUser])
  return (
    <div>
      <div className="flex flex-col">
        <div>{currentUser?.email}</div>
        <div>{currentUser?.displayName}</div>
        <div>{currentUser?.uid}</div>
        
      </div>
      <button className="bg-faded-blue text-white rounded-md px-3 py-2" onClick={logout}>
        LogOut
      </button>
    </div>
  );
}

export default Account;
