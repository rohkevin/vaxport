import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router';

const AppContext = React.createContext();

function AppProvider({ children }) {
  const [reviewStatus, setReviewStatus] = useState(true);
  const [loginAlert, setLoginAlert] = useState({show: false, type: '', msg: ''});
  const [currentPercentage, setCurrentPercentage] = useState(0);

  // const { pathname } = useLocation();

  // useEffect(() => {
  //   if (pathname) {
  //     if (pathname === "/create-profile") {
  //       setCurrentPercentage(0);
  //     }
  //     if (pathname === "/upload") {
  //       setCurrentPercentage(33);
  //     }
  //     if (pathname === "/create-profile") {
  //       setCurrentPercentage(0);
  //     }
  //   }
  // }, [pathname])

  const showAlert = (show = false, type = '', msg = '') => {
    setLoginAlert({show, type, msg});
  }

  return (
    <AppContext.Provider
      value={{
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
