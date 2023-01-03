import React from 'react'
import {signInWithGoogle} from "../Firebase/config"


const GoogleAuth = () => {
    const googleAuth = () => {
        signInWithGoogle().then((response) => {
            const g_name=response.user.displayName
            const profPic=response.user.photoURL

            localStorage.setItem("name",g_name)
            localStorage.setItem("profilePic",profPic)

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

export default GoogleAuth;