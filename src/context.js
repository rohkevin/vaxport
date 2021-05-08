import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'

const AppContext = React.createContext();

function AppProvider({ children }) {
  let history = useHistory();

  return (
    <AppContext.Provider
      value={
        history
      }
    >
      { children }
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}
export { AppContext, AppProvider }
