import React from 'react'
import Background from "../../ReusableComp/Background/Background"
import Home from "../../Pages/Home/Home"
import Navbar from '../../ReusableComp/Navbar/Navbar'

function HomePage() {
  return (
    <>
    <Background Children={<Home/>} navbar={<Navbar/>}/>
    </>
  )
}

export default HomePage