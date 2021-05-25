import React, { useContext, useEffect, useState } from 'react'
import { useAuth } from './Auth';
import { db } from './firebase';

const AppContext = React.createContext();

function AppProvider({ children }) {
  const [showSignup, setShowSignup] = useState(true);
  const [reviewStatus, setReviewStatus] = useState(true);
  const [loginAlert, setLoginAlert] = useState({show: false, type: '', msg: ''});
  const [currentPercentage, setCurrentPercentage] = useState(0);
  const [users, setUsers] = useState(null);
  const [user, setUser] = useState(null);
  const [adminAccess, setAdminAccess] = useState(false);

  const { currentUser } = useAuth();

  useEffect(() => {
    db.collection("users").onSnapshot(snap => {
      const registeredUsers = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(registeredUsers);
    })

  }, [])
  useEffect(() => {
    if (currentUser) {
      db.collection("users").doc(currentUser.email).get().then(doc => {
        setUser(doc.data());
      })
    }
  }, [currentUser])
  useEffect(() => {
    if (user) {
      if ("adminAccess" in user) {
        setAdminAccess(true);
      }
    }
  },[user])

  const showAlert = (show = false, type = '', msg = '') => {
    setLoginAlert({show, type, msg});
  }

  return (
    <AppContext.Provider
      value={{
        user,
        users, setUsers,
        showSignup, setShowSignup,
        reviewStatus, setReviewStatus,
        loginAlert, showAlert,
        currentPercentage, setCurrentPercentage,
        adminAccess
      }}
    >
      { children }
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}
export { AppContext, AppProvider }
