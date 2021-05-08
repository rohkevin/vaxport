import React, { useContext, useState } from 'react'

const AppContext = React.createContext();

function AppProvider({ children }) {
  const [reviewStatus, setReviewStatus] = useState(true);

  return (
    <AppContext.Provider
      value={{
        reviewStatus
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
