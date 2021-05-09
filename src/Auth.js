import React, { useContext, useEffect, useState } from 'react'
import { auth } from './firebase.js'

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  // Add Login persistence so that it doesn't log out user on page refresh
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      return unsubscribe
    })
  }, [])

  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password)
  }
  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password)
  }
  const logout = () => {
    return auth.signOut();
  }
  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  }
  const updateEmail = (email) => {
    currentUser.updateEmail(email);
  }
  const updatePassword = (password) => {
    currentUser.updatePassword(password);
  }

  return (  
    <AuthContext.Provider
      value={{
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
      }}
    >
      { children }
    </AuthContext.Provider>
  )
}
export function useAuth() {
  return useContext(AuthContext)
}