import React, { useEffect } from 'react'
import './MainLayout.scss'

import ProgressBar from '../ProgressBar/ProgressBar'
import { useGlobalContext } from '../../context'
import { useLocation } from 'react-router';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

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
    <div className={pathname === '/dashboard' ? 'display-none' : 'full-mid'} id="main-layout">
      <div className="max-width">
        <Link to="/" className="back-home"><FiArrowLeft /><p>Back home</p></Link>
        {!showSignup && pathname ==="/login" ? null : <ProgressBar/>}
        <div className="children">{ children }</div>
      </div>
    </div>
  )
}

export default MainLayout
