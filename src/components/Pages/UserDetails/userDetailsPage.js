import React from 'react'
import Background from '../../ReusableComp/Background/Background'
import UserDetails from './userDetails'

function UserDetailsPage() {
  return (
    <><Background Children={<UserDetails/>}/></>
  )
}

export default UserDetailsPage