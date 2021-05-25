
import React from 'react'
import './QRScannerModal.scss'

import QRScanner from '../QRScanner/QRScanner'

import {FaChevronUp} from 'react-icons/fa'
function QRScannerModal({ isOpen, toggleScannerModal, closeScanner }) {
  return (
    <div className={ isOpen ? 'show-scanner scanner-modal' : 'scanner-modal' }>
      {isOpen && (
        <>
          <div className="scanner-head">
            <button onClick={toggleScannerModal}><FaChevronUp /></button>
          </div>
          <QRScanner closeScanner={closeScanner}/>
        </>
      )}
      
    </div>
  )
}

export default QRScannerModal
