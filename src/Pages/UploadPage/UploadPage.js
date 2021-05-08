import React from 'react'
import { useHistory } from 'react-router';

function UploadPage() {
  let history = useHistory();

  const handleUpload = () => {
    // If upload successful display success message 
    // Temporary reroute
    history.push("/pending-review");
  }
  return (
    <main>
      <button></button>
      <h1 className="h6">Upload Required Documents</h1>
      <button>Passport</button>
      <button>Vaccination Record</button>

      <button type="button" onClick={handleUpload}>Done</button>
    </main>
  )
}

export default UploadPage
