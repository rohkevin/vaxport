import React from 'react'
import { useHistory } from 'react-router'
import './PendingPage.scss'

const verifiedIcon = process.env.PUBLIC_URL + '/assets/icons/verifiedIcon.svg'

function PendingPage() {
  let history = useHistory();

  return (
    <main id="pending-page">
      <div className="page-wrapper">
        <figure>
          <img src={verifiedIcon} alt="pending"/>
        </figure>

        <h3>Uploaded Successfully!</h3>
        <p>Your documents are under review.</p>
        <p>A notification will be sent to your email when your vaccination badge is ready</p>
        <br/>
        <p>Please wait up to 7 business days!</p>
        <button onClick={()=>{history.push("/dashboard")}}>Close Window</button>

      </div>
    </main>
  )
}

export default PendingPage
