import React from 'react'
import "./Edit.css";
import {Avatar} from '@chakra-ui/react'

function Edit() {
  return (
    <div className='blue-card flex flex-col justify-center items-center py-8'>
      
        <div className='flex flex-col items-center justify-center'>
          <Avatar size="lg"></Avatar>
          <p className='Edit-profile'>Change Profile Photo</p>
        </div>
      <div className='flex flex-col items-center justify-center'>
        <div>

        <form className='field-box'>
        <div className='input-field'>
          <input 
            className='align'
            type='text' 
            placeholder='Change First Name'
            />
        </div>
        <div className='input-field'>
          <input 
            className='align'
            type='text' 
            placeholder='Change Last Name'
            />
        </div>
        <div className='input-field'>
          <input 
            className='align'
            type='text' 
            placeholder='Change Phone Number'
            />
        </div>
        <div className='input-field'>
          <input 
            className='align'
            type='text' 
            placeholder='Change Bus Number'
            />
        </div>
      </form>
        </div>
        <div className='bg-faded-blue px-2 py-2 w-50 text-white rounded-lg items-center text-center mt-8'>
          <button type='Submit'>Update Change</button>
        </div>
      </div>
    </div>

  )
}

export default Edit
