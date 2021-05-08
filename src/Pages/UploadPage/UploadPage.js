import React from 'react'
import { useHistory } from 'react-router';
import './UploadPage.scss'

const uploadIcon = process.env.PUBLIC_URL + '/assets/icons/uploadIcon.svg'

function UploadPage() {
  let history = useHistory();

  const handleUpload = () => {
    // If upload successful display success message 
    // Temporary reroute
    history.push("/pending-review");
  }
  return (
    <main>
      <figure>
        <img src={uploadIcon} alt="upload"/>
      </figure>
      <h1 className="h6">Upload Required Documents</h1>
      <button>Passport</button>
      <button>Vaccination Record</button>
      
      <button type="button" onClick={handleUpload}>Done</button>
    </main>
  )
}

export default UploadPage
