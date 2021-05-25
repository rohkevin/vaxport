import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../Auth'
import { useGlobalContext } from '../../context'

import { FiMenu, FiArrowRight, FiSettings } from 'react-icons/fi'
import { GoVerified } from 'react-icons/go'
import { MdExitToApp } from 'react-icons/md'
import './Home.scss'

const mainImg = process.env.PUBLIC_URL + '/assets/icons/main.svg'

function Home() {
  const { user, setShowSignup, adminAccess } = useGlobalContext();
  const { currentUser, logout } = useAuth();
  const [sidenavOpen, setSidenavOpen] = useState(false);

  const toggleNav = () => {
    setSidenavOpen(!sidenavOpen);
  }
  return (
    <>
      {currentUser && user && (
        <div className={sidenavOpen ? "show-sidenav sidenav" : "sidenav"}>
          <div className="sidenav-header">
            <h1>Vaxport</h1>
          </div>
          <div className="divider"/>
          <div className="nav-user-info">
            <p>Signed in as</p>
            <p className="username">{user.firstName}</p>

          </div>
          
          <div className="sidenav-links">
            <Link to={adminAccess ? "/certified" : "/dashboard"} className="nav-link"><GoVerified /><p>Dashboard</p></Link>
            <Link to="/settings" className="nav-link"><FiSettings /><p>Settings</p></Link>
            <button className="nav-link signout" onClick={() => {logout(); toggleNav()}}><MdExitToApp/>Sign out</button>
          </div>
        </div>
      )}
      

      <main id="home-page" className={sidenavOpen ? "slide-left" : "normal-position"}>
        <div className="header">
          <h1 className="logo">Vaxport</h1>
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

          <Link to="/login"><button className="home-btn" onClick={() => setShowSignup(true)}>GET STARTED</button></Link>
          
        </div>
      </main>
    </>
  )
}

export default Home
