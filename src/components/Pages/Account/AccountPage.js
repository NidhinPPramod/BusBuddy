import React from 'react'
import Background from "../../ReusableComp/Background/Background"
import Account from './Account'

function AccountPage() {
  return (
    <div>
        <Background Children={<Account/>}/>
    </div>
  )
}

export default AccountPage