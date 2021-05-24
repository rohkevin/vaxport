import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import './UserQR.scss'
import { useAuth } from '../../Auth'
import { db, storage } from '../../firebase'
import QRCode from 'qrcode'

const qrImage = process.env.PUBLIC_URL + '/assets/icons/QRCode.svg'

function UserQR() {
  const { currentUser } = useAuth();
  const [qr, setQr] = useState(null);

  const userRef = db.collection("users").doc(currentUser.email);

  // Get QR
  useEffect(() => {
    if (currentUser) {
      userRef.get().then((doc) => {
        const { userQRimage } = doc.data();
        if (userQRimage) {
          setQr(userQRimage)
        }
      })
    }
  }, [currentUser])

  // Generate QR
  useEffect(() => {
    if (currentUser) {
      userRef.get().then((doc) => {
        const { governmentVerified, userQRimage } = doc.data();
        if (governmentVerified) {
          // Generate QR code
          // Generate unique QR URL and id to store to server, only if qr image is not there
          if (!userQRimage) {

            QRCode.toDataURL('Testing')
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


  return (
    <main id="qrcode">
      <div  className="button-wrapper">
        <Link to="/dashboard" className="link"><button type="button" className="icon-btn"><FiArrowLeft/></button></Link>

      </div>

      {
        qr ? 
        <div className="page-wrapper">
          <h2>Vaccination Passport</h2>
          <p>This QR code is valid in over 50 countries globally as your proof of vaccination.</p>
          <table className="user-info">
            <tr>
              <td>Name</td>
              <td>NameVal</td>
            </tr>
            <tr>
              <td>Passport</td>
              <td>PassportVal</td>
            </tr>
          </table>

          <div className="qr-image">
            <figure>
              <img src={qr} alt={`QR for ${currentUser.email}`}/>
            </figure>
          </div>

        </div>
        :
        <div className="page-wrapper">
          <h1>QR code could not be generated</h1>
        </div>
      }
      
    </main>
  )
}

export default UserQR
