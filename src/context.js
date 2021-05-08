import React, { useContext, useState } from 'react'

const AppContext = React.createContext();

function AppProvider({ children }) {
  const [reviewStatus, setReviewStatus] = useState(true);
  const [loginAlert, setLoginAlert] = useState({show: false, type: '', msg: ''});

  const showAlert = (show = false, type = '', msg = '') => {
    setLoginAlert({show, type, msg});
  }
  return (
    <AppContext.Provider
      value={{
        reviewStatus, setReviewStatus,
        loginAlert, showAlert,
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
