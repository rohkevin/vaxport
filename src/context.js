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
  const [progress, setProgress] = useState(0);
  const [progressCheck, setProgressCheck] = useState([
    { checkpointName: "account", status: false },
    { checkpointName: "passport", status: false },
    { checkpointName: "records", status: false }
  ])

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
      const unsubscribe = db.collection("users").doc(currentUser.email).onSnapshot((doc) => {
        setUser(doc.data());
      });
      return () => unsubscribe();
    }
  }, [currentUser])

  useEffect(() => {
    if (user) {
      if ("adminAccess" in user) {
        setAdminAccess(true);
      }
      // Progress bar checks for when a user relogs in to complete their profile
      if ("firstName" in user && "lastName" in user && "email" in user) {
        updateProgressCheck("account");
      }
      if ("nationality" in user && "passportNumber" in user) {
        updateProgressCheck("passport");
      }
    }
  }, [user])

  const showAlert = (show = false, type = '', msg = '') => {
    setLoginAlert({show, type, msg});
  }

  const updateProgressCheck = (checkpointName) => {

    const checkIndex = progressCheck.findIndex((checkpoint) => checkpoint.checkpointName === checkpointName);
    let updated = progressCheck.map((checkpoint, index) => {
      if (index <= checkIndex) {
        return {...checkpoint, status: true};
      }
      return checkpoint;
    })
    setProgressCheck(updated);

  }

  return (
    <AppContext.Provider
      value={{
        user, setUser,
        users, setUsers,
        showSignup, setShowSignup,
        reviewStatus, setReviewStatus,
        loginAlert, showAlert,
        currentPercentage, setCurrentPercentage,
        adminAccess,
        progress, setProgress,
        progressCheck, setProgressCheck, updateProgressCheck
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
