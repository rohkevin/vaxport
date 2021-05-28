import React, { useEffect } from 'react'
import './MainLayout.scss'

import ProgressBar from '../ProgressBar/ProgressBar'
import { useGlobalContext } from '../../context'
import { useLocation } from 'react-router';

function MainLayout({ children }) {
  const { showSignup, setProgress } = useGlobalContext();

  const { pathname } = useLocation();
  
  useEffect(() => {
    if (pathname) {
      if (pathname === "/login") {
        setProgress(0);
      }
      if (pathname === "/upload-passport") {
        setProgress(50);
      }
      if (pathname === "/upload-records") {
        setProgress(50);
      }
      if (pathname === "/pending-review") {
        setProgress(100);
      }
    }
  }, [pathname])

  return (
    <div className={pathname === '/dashboard' ? 'display-none' : 'full-mid'}>
      {!showSignup && pathname ==="/login" ? null : <ProgressBar/>}
      <div className="children">{ children }</div>
    </div>
  )
}

export default MainLayout
