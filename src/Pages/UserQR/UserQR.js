import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import './UserQR.scss'
import { useAuth } from '../../Auth'
import { db, storage } from '../../firebase'
import QRCode from 'qrcode'
import { useGlobalContext } from '../../context'

const qrImage = process.env.PUBLIC_URL + '/assets/icons/QRCode.svg'

function UserQR() {
  const { currentUser } = useAuth();
  const { user } = useGlobalContext();
  const [qr, setQr] = useState(null);

  useEffect(() => {
    if (currentUser){
      // Get QR
      const userRef = db.collection("users").doc(currentUser.email);
      userRef.get().then((doc) => {
        const { userQRimage } = doc.data();
        // Only re-set if qr image path is diff
        if (userQRimage && qr !== userQRimage) {
          setQr(userQRimage)
        }
      })

    }
  }, [currentUser])
  
  useEffect(() => {
    if (currentUser) {
      // Generate QR
      const userRef = db.collection("users").doc(currentUser.email);
      userRef.get().then((doc) => {
        const { governmentVerified, userQRimage } = doc.data();
        if (governmentVerified) {
          // Generate QR code
          // Generate unique QR URL and id to store to server, only if qr image is not there
          if (!userQRimage) {

            QRCode.toDataURL('Testing', { width: 300 })
            .then(url => {
              // url returns a base64 string image, metadata image/png
              // store to user then render set to state, render
              console.log(url);
  

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
          alert('This user is not verified')
        }
      })
    }


  }, [currentUser])

  if (qr) {
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

  } else {
    return (
      <main id="qrcode">
        <div  className="button-wrapper">
          <Link to="/dashboard" className="link"><button type="button" className="icon-btn"><FiArrowLeft/></button></Link>
        </div>

        <div className="page-wrapper">
          <h1>QR code could not be generated</h1>
        </div>
      </main>
    )
  }
}

export default UserQR
