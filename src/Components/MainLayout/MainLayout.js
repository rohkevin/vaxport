import React, { useEffect } from 'react'
import './MainLayout.scss'

import ProgressBar from '../ProgressBar/ProgressBar'
import { useGlobalContext } from '../../context'
import { useLocation } from 'react-router';

function MainLayout({ children }) {
  const { currentPercentage, setCurrentPercentage } = useGlobalContext();

  const { pathname } = useLocation();
  
  useEffect(() => {
  if (pathname) {
    if (pathname === "/upload-passport") {
      setCurrentPercentage(50);
    }
    if (pathname === "/upload-records") {
      setCurrentPercentage(50);
    }
    if (pathname === "/upload") {
      setCurrentPercentage(50);
      console.log(pathname);
    }
    if (pathname === "/pending-review") {
      setCurrentPercentage(100);
    }
  }
  }, [pathname])

  return (
    <div className={pathname === '/dashboard' ? 'display-none' : 'full-mid'}>
      <ProgressBar done={currentPercentage}/>
      <div className="children">{ children }</div>
    </div>
  )
}

export default MainLayout
