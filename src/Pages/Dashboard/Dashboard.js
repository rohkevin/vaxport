import React from 'react'
import { useHistory } from 'react-router'
import './Dashboard.scss'

function Dashboard() {
  let history = useHistory();
  return (
    <main id="dashboard">
      <div className="page-wrapper">
        <h1>My Account</h1>
        <h3>Legal Name</h3>
        <div className="info-box">
          name
        </div>
        <h3>Email</h3>
        <div className="info-box">
          email
        </div>
        <h3>Passport Information</h3>
        <div className="info-box">
          passport number
        </div>
        <button type="button" onClick={() => history.push("/QRCode")} className="button-2">View My QR Badge</button>
      </div>
    </main>
  )
}

export default Dashboard
