import React from 'react'
import { useHistory } from 'react-router'

function PendingPage() {
  let history = useHistory();

  return (
    <main>
      <h1 className="h2">Your records are under review</h1>
      <p>We are verifying your records with the government's databases.</p>
      <p>Please check back in 24-48 hours to confirm your verification!</p>
      <br/>
      <p>If you do not see and updates, please contact 1-800-000-0000</p>
      <button onClick={()=>{history.push("/review-status")}}>Temp button</button>
    </main>
  )
}

export default PendingPage
