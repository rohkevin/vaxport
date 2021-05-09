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
        {/* Generated from user id */}
        <div className="info-box">
          Kevin Roh
        </div>
        <h3>Email</h3>
        <div className="info-box">
          kev@kev.com
        </div>
        <h3>Passport Information</h3>
        <div className="info-box">
          A1A1A1A1
        </div>
        <h3>Vaccination Records</h3>
        <div className="info-box">
          <p>Vaccination: COVID-19</p>
          <p>Received: Pfizer</p>
          <p>1st Dose Received: 10/05/2021</p>
          <p>2nd Dose Received: 10/09/2021</p>
          <p></p>

        </div>
        <button type="button" onClick={() => history.push("/QRCode")} className="button-2">View My QR Badge</button>
      </div>
    </main>
  )
}

export default Dashboard
