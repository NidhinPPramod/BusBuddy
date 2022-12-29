import React, { useState,useEffect } from "react";
import { db } from "../../Firebase/config";
import { collection, addDoc,getDocs } from "firebase/firestore";
import UseForms from "../UserForm/useForms";

function UserForm() {
  const [users, setUsers] = useState([])
  const collectionRef = collection(db, "UserDetails");

  const [value, handleChange] = UseForms({ To: "", From: "" });

  useEffect(() => {
    //READ
    getDocs(collectionRef).then((response) => {
      setUsers(response.docs.map((obj) => ({ ...obj.data(), id: obj.id })));
    });
  }, []);

  const addDocs = async () => {
    //CREATE
    await addDoc(collectionRef, {
      To: value.To,
      From: value.From,
    });
  };

  return (
    <div>
      <h1>Enter User Details</h1>
      <input type="text" value={users.Name} />
      <input type="number" value={users.Distance} />
      <input
        type="text"
        value={value.To}
        name="To"
        placeholder="Enter Destination"
        onChange={handleChange}
      />
      <input
        type="text"
        value={value.From}
        name="From"
        placeholder="Enter From Location"
        onChange={handleChange}
      />
      <button onClick={addDocs}>Submit</button>̥
    </div>
  );
}

export default UserForm;
