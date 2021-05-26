import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { useAuth } from '../../Auth';
import { db } from '../../firebase';
import './Dashboard.scss'
import { FiSettings } from 'react-icons/fi'
import LatestNews from '../../Components/LatestNews/LatestNews';
import { Link } from 'react-router-dom';
import MyDocuments from '../../Components/MyDocuments/MyDocuments';
const peoplePic = process.env.PUBLIC_URL + '/assets/icons/people.jpg';

function Dashboard() {
  const { currentUser } = useAuth();
  const [user, setUser] = useState(null);
  const [showDocs, setShowDocs] = useState(false);
  let history = useHistory();

  // Get user info on dashboard
  useEffect(() => {
    if (currentUser) {
      db.collection("users").doc(currentUser.email).get().then((doc) => {
        const userData = doc.data();
        const { firstName, lastName, email, passportNumber, recordURL } = userData;
        var governmentVerified = null;

        if ("governmentVerified" in userData) {
          governmentVerified = userData.governmentVerified
        }
        setUser({
          name: firstName.charAt(0).toUpperCase() + firstName.slice(1) + ' ' + lastName.charAt(0).toUpperCase() + lastName.slice(1),
          email: email,
          passport: passportNumber,
          governmentVerified: governmentVerified,
          recordURL: recordURL
        })
      })
    }
  }, [currentUser])


  const handleQrRequest = () => {
    if (user.governmentVerified === null) {
      history.push("/pending-review");
    } else {
      history.push("/QRCode")
    }
  }

  const closeDocs = () => {
    setShowDocs(false);
  }

  if (user) {
    return (
      <main id="dashboard">
        <div className="header">
          <Link to="/"><h1 className="logo">Vaxport</h1></Link>
          <Link to="/settings" className="link"><button type="button" className="icon-btn"><FiSettings/></button></Link>
        </div>

        <figure>
          <img src={peoplePic} alt="dashboard-header"/>
        </figure>
        <h4>Welcome back</h4>
        <h1>{user.name}</h1>
        <div className="dashboard-buttons">
          <button 
            type="button" 
            className="button"
            onClick={() => setShowDocs(true)}
            >
            View My Documents
          </button>
          <MyDocuments showDocs={showDocs} closeDocs={closeDocs} user={user}/>
          <button 
            type="button" 
            onClick={handleQrRequest} 
            className="button"
            >
            View My QR Badge
          </button>
        </div>
        <LatestNews />
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

export default Dashboard
