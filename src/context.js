import React, { useContext, useEffect, useState } from 'react'
import { db } from './firebase';

const AppContext = React.createContext();

function AppProvider({ children }) {
  const [showSignup, setShowSignup] = useState(true);
  const [reviewStatus, setReviewStatus] = useState(true);
  const [loginAlert, setLoginAlert] = useState({show: false, type: '', msg: ''});
  const [currentPercentage, setCurrentPercentage] = useState(0);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    db.collection("users").onSnapshot(snap => {
      const registeredUsers = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      // console.log(registeredUsers);
      setUsers(registeredUsers);
    })

  }, [])
  const showAlert = (show = false, type = '', msg = '') => {
    setLoginAlert({show, type, msg});
  }

  return (
    <AppContext.Provider
      value={{
        users, setUsers,
        showSignup, setShowSignup,
        reviewStatus, setReviewStatus,
        loginAlert, showAlert,
        currentPercentage, setCurrentPercentage,
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
