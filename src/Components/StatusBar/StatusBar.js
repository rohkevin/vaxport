import React, { useState } from 'react'
import { FaCheck } from 'react-icons/fa'
import './StatusBar.scss'

function StatusBar() {
  const [currentLocation, setCurrentLocation] = useState(null);

  return (
    <div id="status-bar">
      <div className="status">
        <p>Account</p>
        <div className="status-point">
          
        </div>
      </div>
      <div className="status-track"></div>

      <div className="status">
        <p>Passport</p>
        <div className="status-point">
          
        </div>
      </div>
      <div className="status-track"></div>

      <div className="status">
        <p>Receipt</p>
        <div className="status-point">
          
        </div>
      </div>
    </div>
  )
}

export default StatusBar
