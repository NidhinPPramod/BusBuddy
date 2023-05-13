import React from 'react'
import Background from '../../ReusableComp/Background/Background'
import Location from '../../Pages/Location/Location'
import Navbar from '../../ReusableComp/Navbar/Navbar'

function LocationPage() {
  return (
    <>
    <Background Children={<Location/>} navbar={<Navbar/>}/>
    </>
  )
}

export default LocationPage