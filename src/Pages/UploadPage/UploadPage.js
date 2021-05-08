import React from 'react'
import { useHistory } from 'react-router';
import { useGlobalContext } from '../../context'

function UploadPage() {
  let history = useHistory();

  const handleUpload = () => {
    // If upload successful display success message 
    // Temporary reroute
    history.push("/pending-review");
  }
  return (
    <main>
      <h1 className="h2">Upload Documents</h1>
      <p>Please upload a clear picture of your vaccination record.</p>
      <button type="button" onClick={handleUpload}>Upload image</button>
      <p>*If you have already uploaded an image, do not upload again. You will receive a confirmation email if image has been successfully uploaded.</p>
    </main>
  )
}

export default UploadPage
