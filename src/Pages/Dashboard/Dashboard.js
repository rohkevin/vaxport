import React from 'react'
import QRCode from '../../Components/QRCode/QRCode'

function Dashboard() {
  return (
    <div>
      <QRCode />
      <div className="records">
        <p>Name: </p> 
        <p>Date of Birth: </p>
        <p>Passport Number: </p>
        
      </div>
    </div>
  )
}

export default Dashboard
