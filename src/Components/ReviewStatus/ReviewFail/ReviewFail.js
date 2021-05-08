import React from 'react'
import { Link } from 'react-router-dom'

function ReviewFail() {
  return (
    <div>
      <h1 className="h4">Your vaccination records could not be confirmed</h1>
      <p>Some reasons could be:</p>
      <ul>
        <li>Your uploaded image may not have been clear enough</li>
        <li>Records were not found in the database</li>
      </ul>
      <p>Please try re-uploading your record or</p>
      <p>Contact your local health record issuer</p>
      <Link to="/upload" />
    </div>
  )
}

export default ReviewFail
