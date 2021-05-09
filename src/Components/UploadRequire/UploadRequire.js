import React from 'react'
import { FaCheck } from 'react-icons/fa'
import './UploadRequire.scss'

function UploadRequire({ title, status }) {
  return (
    <div className="upload-container">
      <p>{title}</p>
      <div className={status ? 'status active' : 'status'}>
        {status ? <FaCheck /> : null }
      </div>
    </div>
  )
}

export default UploadRequire
