import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { db } from '../../firebase';
import './QRRedirect.scss'

// Page used to show result of QR scan.
// This is essentially what the TSA agents would see.
// Assume that this code scan is generated by 

function QRRedirect() {
  let { userID } = useParams();
  const [verifiedUser, setVerifiedUser] = useState(null);

  useEffect(() => {
    db.collection("users").get().then(querySnap => {
      querySnap.forEach((doc) => {
        let docData = doc.data();
        if (docData.id === userID) { 
          setVerifiedUser(doc.data())
        }
      })
    })

  }, [userID])

  if (verifiedUser) {
    return (
      <main id="client-data-page">
          <div className="header">
            <Link to="/"><h1 className="logo">Vaxport</h1></Link>
          </div>
          <div className="page-wrapper">
            <h2>Vaccination Passport</h2>
            <div className="user-info">
              <span className="table-label">Name</span>
              <span className="table-value">
              {`${verifiedUser.firstName.charAt(0).toUpperCase() + verifiedUser.firstName.slice(1)} ${verifiedUser.lastName.charAt(0).toUpperCase() + verifiedUser.lastName.slice(1)}`}
              </span>
              <span className="table-label">Date of Birth</span>
              <span className="table-value">{`${verifiedUser.DOB}`}</span>
              <span className="table-label">Passport Number</span>
              <span className="table-value">{`${verifiedUser.passportNumber}`}</span>
              {/* Currently info below is assumed to be given by gpv database along with DOB, will need to incorporate a gov database to simulate this */}
              <span className="table-label">Authorized Vaccination Organization</span>
              <span className="table-value">{`${verifiedUser.vaccineProvider}`}</span>
              <span className="table-label">Vaccine Agent</span>
              <span className="table-value">{`${verifiedUser.vaccineType}`}</span>
              <span className="table-label">Date of Vaccination</span>
              <span className="table-value">{`${verifiedUser.vaccineDate}`}</span>
            </div>
  
          </div>
          
        </main>
    )
  } else {
    return (
      <main id="client-data-page">
        <h2>User data does not exist</h2>
        <p>{userID}</p>
      </main>
    )
  }
}

export default QRRedirect
