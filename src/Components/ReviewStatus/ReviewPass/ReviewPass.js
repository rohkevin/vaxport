import React from 'react'
import { Link } from 'react-router-dom'

function ReviewPass() {
  return (
    <div>
      <h1 className="h4">Your vaccination record has been confirmed</h1>
      <Link to="/dashboard">Go to your dashboard</Link>
      
    </div>
  )
}

export default ReviewPass
