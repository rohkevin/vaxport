import React, { useEffect } from 'react'

import ProgressBar from '../ProgressBar/ProgressBar'
import { useGlobalContext } from '../../context'
import { useLocation } from 'react-router';

function MainLayout({ children }) {
  const { currentPercentage, setCurrentPercentage } = useGlobalContext();

  const { pathname } = useLocation();
  useEffect(() => {
  if (pathname) {
    if (pathname === "/create-profile") {
      setCurrentPercentage(0);
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
    <div>
      <ProgressBar done={currentPercentage}/>
      { children }
    </div>
  )
}

export default MainLayout
