import React from 'react'
import "./Navbar.css"
import{ Link} from "react-router-dom"
import HomeIcon from "../../../images/Home.svg";
import LocationIcon from "../../../images/Location.svg";
import AccountIcon from "../../../images/Account.svg";

function Navbar() {
  return (
    <div className='navbar w-100 flex flex-row justify-around z-20'>
      <Link to='/location'>
        <div>
           <img className="w-14 h-12" src={LocationIcon} alt=""/>
        </div>
      </Link>
      <Link to='/home'>
        <div>
        <img className="w-14 h-12" src={HomeIcon} alt=""/>
        </div>
      </Link>
      <Link to='/account'>
        <div>
        <img className="w-14 h-12" src={AccountIcon} alt=""/>
        </div>
      </Link>
    </div>
  )
}

export default Navbar
