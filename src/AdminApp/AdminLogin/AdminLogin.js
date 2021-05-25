// LOGIN MAIN PAGE FOR ADMINS
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiSettings } from 'react-icons/fi'
import { useAuth } from '../../Auth';
import { db } from '../../firebase';

import QRScannerModal from '../QRScannerModal/QRScannerModal'

const peoplePic = process.env.PUBLIC_URL + '/assets/icons/people.jpg';
function AdminLogin() {
  const { currentUser } = useAuth();
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scannerModal, setScannerModal] = useState(false);

  useEffect(() => {
    if (currentUser) {
      db.collection("users").doc(currentUser.email).get().then(doc => {
        const userData = doc.data();
        const { firstName, lastName, email } = userData;
        setUser({
          name: firstName.charAt(0).toUpperCase() + firstName.slice(1) + ' ' + lastName.charAt(0).toUpperCase() + lastName.slice(1),
          email: email,
        })
      })
    }
  }, [currentUser])

  const openScanner = () => {
    setScannerModal(true);
  }
  const toggleScannerModal = () => {
    setScannerModal(!scannerModal);
  }
  const handleOutsideClick = (e) => {
    if (e.target.classList.contains('overlay')) {
      // setScannerModal(false);
    }
  }

  if (user) {
    return (
      <main id="dashboard">
          <div className="header">
            <Link to="/"><h1 className="logo">Vaxport</h1></Link>
            <Link to="/" className="link"><button type="button" className="icon-btn"><FiSettings/></button></Link>
          </div>
  
          <figure>
            <img src={peoplePic} alt="dashboard-header"/>
          </figure>

          <h4>Welcome back</h4>
          <h1>{user.name}</h1>
          <button 
            type="button" 
            className="button"
            onClick={openScanner}
            >
            Scan QR Code
          </button>
        
          <QRScannerModal 
            isOpen={scannerModal} 
            toggleScannerModal={toggleScannerModal}
          />
        </main>
    )
  } else {
    return (
      <main id="dashboard">
        <h2>Loading...</h2>
      </main>
    )
  }
}

export default AdminLogin
