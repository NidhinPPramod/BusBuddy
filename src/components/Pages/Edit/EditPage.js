import React from 'react'
import Background from '../../ReusableComp/Background/Background'
import Edit from './Edit'

function EditPage() {
  return (
    <div>
        <Background Children={<Edit/>}/>
    </div>
  )
}

export default EditPage
