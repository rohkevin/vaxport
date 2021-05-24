import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { useAuth } from '../../Auth';
import { db } from '../../firebase';
import './Dashboard.scss'
import { FiSettings } from 'react-icons/fi'
import LatestNews from '../../Components/LatestNews/LatestNews';
import { Link } from 'react-router-dom';
const peoplePic = process.env.PUBLIC_URL + '/assets/icons/people.jpg';

function Dashboard() {
  const { currentUser } = useAuth();
  const [user, setUser] = useState(null);
  let history = useHistory();

  // Get user info on dashboard
  useEffect(() => {
    if (currentUser) {
      db.collection("users").doc(currentUser.email).get().then((doc) => {
        const userData = doc.data();
        const { firstName, lastName, email, passportNumber } = userData;
        var governmentVerified = null;

        if ("governmentVerified" in userData) {
          governmentVerified = userData.governmentVerified
        }
        setUser({
          name: firstName.charAt(0).toUpperCase() + firstName.slice(1) + ' ' + lastName.charAt(0).toUpperCase() + lastName.slice(1),
          email: email,
          passport: passportNumber,
          governmentVerified: governmentVerified
        })
      })
    }
  }, [currentUser])


  const handleQrRequest = () => {
    if (user.governmentVerified === null) {
      history.push("/pending-review");
    } else if (user.governmentVerified === false) {
      // Error message should be shown first in dashboard
      // Button click does not work for anything
      alert('Records invalid!!!')
    } else if (user.governmentVerified === true) {
      // Generate code 
      history.push("/QRCode");
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
        <div className="dashboard-buttons">
          <button 
            type="button" 
            className="button"
            onClick={() => alert('Coming soon!')}
            >
            View My Documents
          </button>
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
