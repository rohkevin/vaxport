import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import './QRCode.scss'

const qrImage = process.env.PUBLIC_URL + '/assets/icons/QRCode.svg'

function QRCode() {
  return (
    <main id="qrcode">
      <div  className="button-wrapper">
        <Link to="/dashboard" className="link"><button type="button" className="icon-btn"><FiArrowLeft/></button></Link>

      </div>
      <div className="page-wrapper">
        <h2>Vaccination Passport</h2>
        <p>This QR code is valid in over 50 countries globally as your proof of vaccination.</p>

        {/* Generate QR Code */}
        {/* Logic:
          When the app gets a confirmation of vaccination record from the governmental database, it will generate ONE unique QR code per user that is verified.
          The QR Code generated logic will occur in a separate file, and render it below by getting it from the firebase database.
        */}
        <div className="qr-image">
          <figure>
            <img src={qrImage} alt="Placeholder QR"/>
          </figure>
        </div>

        <h3>Your unique code</h3>
        {/* Placeholder, code ID is stored in firebase */}
        <h3>GZ83-3059-9674-3219</h3>

      </div>
    </main>
  )
}

export default QRCode
