import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../Auth'
import { useGlobalContext } from '../../context'

import { FiMenu, FiArrowRight } from 'react-icons/fi'

import './Home.scss'
import Sidenav from '../../Components/Sidenav/Sidenav'

const mainImg = process.env.PUBLIC_URL + '/assets/icons/main.svg'

function Home() {
  const { user, setUser, setShowSignup, setProgressCheck } = useGlobalContext();
  const { currentUser, logout } = useAuth();
  const [sidenavOpen, setSidenavOpen] = useState(false);
  const [routeTo, setRouteTo] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const checkSize = () => {
    setWindowWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener('resize', checkSize);
    return () => {
      window.removeEventListener('reszize', checkSize)
    }
  })

  useEffect(() => {
    if (user) {
      if(user.adminAccess) {
        setRouteTo("/certified");
        return;
      }
      // passport dne - route to uploadpassport
      if (!user.passportNumber) {
        setRouteTo("/upload-passport");
        return;
      }
      //records dne - route to records
      if (!user.recordURL) {
        setRouteTo("/upload-records");
        return;
      }
      // govverified dne - route to pending
      if (!user.governmentVerified) {
        setRouteTo("/pending-review");
        return;
      }
      // govverified exists - route to dashboard
      if (user.governmentVerified) {
        setRouteTo("/dashboard");
        return;
      }
    }
  }, [user])

  const toggleNav = () => {
    setSidenavOpen(!sidenavOpen);
  }
  const handleLogout = () => {
    logout(); 
    toggleNav();
    setUser(null);
    setProgressCheck([
      { checkpointName: "account", status: false },
      { checkpointName: "passport", status: false },
      { checkpointName: "records", status: false }
    ])
  }
  const handleOutsideClick = (e) => {
    if (sidenavOpen && !e.target.classList.contains("show-sidenav")){
      setSidenavOpen(false);
    }
  }
  
  return (
    <>
      <Sidenav sidenavOpen={sidenavOpen} handleLogout={handleLogout} />

      
      {/* Home */}
      <main id="home-page" className={sidenavOpen ? "slide-left" : "normal-position"} onClick={handleOutsideClick}>
        <div className="header">
          <Link to="/"><h1 className="logo">Vaxport</h1></Link>
          {
            currentUser ?
            <button className="menu-btn" onClick={toggleNav}>{sidenavOpen ? <FiArrowRight/> : <FiMenu />}</button>
            :
            <Link to="/login"><button className="login-btn" onClick={() => setShowSignup(false)}>Sign in</button></Link>
          }
        </div>
        <div className="home-intro">
          <figure>
            <img src={mainImg} alt="Intro to Vaxport"/>
          </figure>
          <h2>Say hello to Vaxport! Globally approved Covid-19 vaccine certification passport platform.</h2>
          <p>We get rid of struggles proving your vaccination record. Make your business trip and vacation more accessible.</p>  
          {
            currentUser && routeTo ? 
              <Link to={routeTo}><button className="home-btn">CONTINUE TO PROFILE</button></Link>
            :
              <Link to="/login"><button className="home-btn" onClick={() => setShowSignup(true)}>GET STARTED</button></Link>
          }
        </div>
      </main>
    </>
  )
}

export default Home
