import React from 'react'
import {signInWithGoogle} from "../Firebase/config"
import { db } from "../../Firebase/config";
import { collection, addDoc } from "firebase/firestore";


const collectionRef = collection(db, "UserDetails");

const GoogleAuth = () => {

    const googleAuth = () => {
        signInWithGoogle().then((response) => {
            const g_name=response.user.displayName
            const profPic=response.user.photoURL


            const addDocs = async () => {
                //CREATE
                await addDoc(collectionRef, {
                  Name: g_name,
                  PhotoUrl: profPic,
                });
              };

              addDocs();
            // localStorage.setItem("name",name)
            // localStorage.setItem("email",email)
            // localStorage.setItem("profilePic",profPic)


        }).catch((err=>{
            console.log(err)
        }))
    }
    return (
        <div className="d-flex justify-content-center align-items-center flex-column">
            <button className="btn btn-outline-primary my-3" onClick={googleAuth}>Sign In With Google
                <i className="fa-brands fa-google mx-2"/></button>
        </div>
    )
}

export default GoogleAuth