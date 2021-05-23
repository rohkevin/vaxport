import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { useAuth } from '../../Auth';
import { db } from '../../firebase';
import './Dashboard.scss'

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
          name: firstName + ' ' + lastName,
          email: email,
          passport: passportNumber,
          governmentVerified: governmentVerified
        })
      })

    }
  }, [])
  if (user) {
    return (
      <main id="dashboard">
        <h2>Welcome back</h2>
        <h3>{user.name}</h3>
        <button 
          type="button" 
          className="button"
          >
          View my documents
        </button>
        <button 
          type="button" 
          onClick={() => history.push("/QRCode")} 
          className="button"
          >
          View My QR Badge
        </button>
        <LatestNews />
      </main>
    )
  } else {
    return (
      <main id="dashboard">
        <h2>No user</h2>
      </main>
    )
  }
}

export default Dashboard
