import React from 'react'
import Background from "../../ReusableComp/Background/Background"
import Navbar from '../../ReusableComp/Navbar/Navbar'
import Account from './Account'

function AccountPage() {
  return (
    <div>
        <Background Children={<Account/>} navbar={<Navbar/>} />
    </div>
  )
}

export default AccountPage