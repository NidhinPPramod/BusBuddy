import React from 'react'
import Background from "../../ReusableComp/Background/Background"
import DriverPanel from './DriverPanel'

function DriverPanelPage() {
  return (
    <>
    <Background Children={<DriverPanel/>}/>
    </>
  )
}

export default DriverPanelPage