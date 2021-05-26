import React, { useEffect, useState } from 'react'
import './MyDocuments.scss'
import { FiChevronUp } from 'react-icons/fi'

function MyDocuments({ showDocs, closeDocs, user }) {
  let govVerified;
  if (user.governmentVerified == null) {
    govVerified = "Your documents are still under review, please check back later."
  } else
  if (user.governmentVerified === false) {
    govVerified = "Your documents could not be verified. Please contact your local health network if this is incorrect."
  }
  else if (user.governmentVerified === true) {
    govVerified = "Your documents have been verified. Your QR code is ready."
  }
  return (
    <div className={showDocs ? "show-docs my-docs" : "my-docs"}>
      <button onClick={closeDocs} className={showDocs ? "show-btn" : "display-none"}><FiChevronUp/></button>
      <div className="docs-table">
        <span className="docs-label">Name</span>
        <span className="docs-value">{user.name}</span>
        <span className="docs-label">Email</span>
        <span className="docs-value">{user.email}</span>
        <span className="docs-label">Passport Number</span>
        <span className="docs-value">{user.passport}</span>
        <span className="docs-label">Record Image</span>
        <span className="docs-value">
          <button 
            onClick={() => window.open(user.recordURL, '_blank')} 
            className="doc-image-link"
            >View Uploaded Image
          </button>
        </span>
        
      </div>
      <p>{govVerified}</p>

    </div>
  )
}

export default MyDocuments
