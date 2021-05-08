import React from 'react'

function UploadPage() {

  const handleUpload = () => {
    // If upload successful display success message 
    // Temporary reroute
  }
  return (
    <main>
      <h1 className="h2">Upload Documents</h1>
      <p>Please upload a clear picture of your vaccination record.</p>
      <button type="button" onClick={handleUpload}>Upload image</button>
      
    </main>
  )
}

export default UploadPage
