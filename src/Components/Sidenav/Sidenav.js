import React from 'react'
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../context'
import { FiSettings } from 'react-icons/fi'
import { GoVerified } from 'react-icons/go'
import { MdExitToApp } from 'react-icons/md'
import { useAuth } from '../../Auth';
import './Sidenav.scss'

function Sidenav({ sidenavOpen, handleLogout }) {
  const { user, adminAccess } = useGlobalContext();
  const { currentUser } = useAuth();
  if (currentUser && user){
    return (
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
          <span className="nav-link signout" onClick={handleLogout}><MdExitToApp/>Sign out</span>
        </div>
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }
}

export default Sidenav
