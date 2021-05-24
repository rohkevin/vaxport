import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../../Auth'
import { db, storage } from '../../firebase'
import QRCode from 'qrcode'

import { useGlobalContext } from '../../context'
import './UserQR.scss'
import { FiArrowLeft } from 'react-icons/fi'

function UserQR() {
  const { currentUser } = useAuth();
  const { user, homeURL } = useGlobalContext();
  const [qr, setQr] = useState(null);
  const [govVerif, setGovVerif] = useState(null);
  let history = useHistory();
  
  useEffect(() => {
    if (currentUser && user) {
      const userRef = db.collection("users").doc(currentUser.email);

      // Get QR
      userRef.get().then((doc) => {
        const { userQRimage } = doc.data();
        // Only re-set if qr image path is diff
        if (userQRimage && qr !== userQRimage) {
          setQr(userQRimage)
        }
      })

      // Generate QR
      userRef.get().then((doc) => {
        const { governmentVerified, userQRimage } = doc.data();
        if (governmentVerified) {
          setGovVerif(true);
          // Generate QR code
          // Generate unique QR URL and id to store to server, only if qr image is not there
          if (!userQRimage) {
            // QRCode.toDataURL(`${homeURL}/QR/user=${user.id}`, { width: 300 })
            QRCode.toDataURL(`/QR/user=${user.id}`, { width: 300 })
            .then(url => {
              // url returns a base64 string image, metadata image/png
              // store to user then render set to state, render

              let fname, lname, pnumber, childPath;
              let uploadTask;
              userRef
              .get()
              .then((doc) => {
                fname=doc.data().firstName;
                lname=doc.data().lastName;
                pnumber=doc.data().passportNumber;
                childPath = fname + lname + pnumber + '_qrCode';
              })
              .then(() => {
                // remove the first 22 digits "data:image/png;base64,"
                var shortenedBase64 = url.substr(22);
                // provide metadata
                var metadata = {
                  contentType: 'image/png'
                }
                uploadTask = storage
                  .ref(`images/${childPath}`)
                  .putString(shortenedBase64, 'base64', metadata);
                
                uploadTask.on(
                  "state_changed",
                  snapshot => {
                  },
                  error => {
                    alert(error);
                  },
                  () => {
                    storage
                    .ref("images")
                    .child(childPath)
                    .getDownloadURL()
                    .then(url => {
                      // Store storage url to user database
                      userRef.set({
                        userQRimage: url
                      }, { merge: true });
                      setQr(url);
                    })
                  }
                )
              })
  
            })
            .catch(err => {
              alert(err, 'Could not generate qr for user');
            })
          }

        } else {
          setGovVerif(false);
        }
      })
    }


  }, [currentUser, user])

  if (qr && govVerif === true && user) {
    return (
      <main id="qrcode">
        <div  className="button-wrapper">
          <Link to="/dashboard" className="link"><button type="button" className="icon-btn"><FiArrowLeft/></button></Link>
  
        </div>
  
        <div className="page-wrapper">
          <h2>Vaccination Passport</h2>
          <p>This QR code is valid in over 50 countries globally as your proof of vaccination.</p>
          <table className="user-info">
            <tr>
              <td className="table-label">Name</td>
              <td className="table-value">{ user ? `${user.firstName} ${user.lastName}` : 'username'}</td>
            </tr>
            <tr>
              <td className="table-label">Passport</td>
              <td className="table-value">{ user ? `${user.passportNumber}` : 'A1A1A1A1'}</td>
            </tr>
          </table>

          <div className="qr-image">
            <figure>
              <img src={qr} alt={`QR for ${currentUser.email}`}/>
            </figure>
          </div>

        </div>
        
      </main>
    )

  } else if (govVerif === false) {
    return (
      <main id="qrcode">
        <div  className="button-wrapper">
          <Link to="/dashboard" className="link"><button type="button" className="icon-btn"><FiArrowLeft/></button></Link>
        </div>

        <div className="page-wrapper" style={{ border: 'none'}}>
          <h2>This user could not be verified.</h2> 
          <p>Please try uploading documents again or contact your health record issuer.</p>
          <button className="button" onClick={() => history.push("/upload-records")}>Upload Records</button>
        </div>
      </main>
    )
  } else {
    return (
      <main id="qrcode">
        <div  className="button-wrapper">
          <Link to="/dashboard" className="link"><button type="button" className="icon-btn"><FiArrowLeft/></button></Link>
        </div>

        <div className="page-wrapper" style={{ border: 'none'}}>
          <h1>Loading...</h1>
        </div>
      </main>
    )
  }
}

export default UserQR
