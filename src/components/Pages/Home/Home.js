import React from 'react'
import { useAuth } from '../../../Contexts/AuthContext'

function Home() {
 
  const {currentUser}=useAuth()

  return (
    <div>
      <h1>user Details</h1>
      {JSON.stringify(currentUser)}
    </div>
  )
}

export default Home