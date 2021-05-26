import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom'


import PrivateRoute from './PrivateRoute'

import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import MainLayout from './Components/MainLayout/MainLayout'
import PassportUpload from './Pages/PassportUpload/PassportUpload'
import RecordsUpload from './Pages/RecordsUpload/RecordsUpload'
import PendingPage from './Pages/PendingPage/PendingPage'
import Dashboard from './Pages/Dashboard/Dashboard'
import UserQR from './Pages/UserQR/UserQR'
import SettingsPage from './Pages/SettingsPage/SettingsPage'

import QRRedirect from './AdminApp/QRRedirect/QRRedirect'
import AdminLogin from './AdminApp/AdminLogin/AdminLogin'
import './theme.scss'

const ScrollToTop = () => {
  const { pathname} = useLocation();
  useEffect(() => {
    window.scrollTo(0,0);
  }, [pathname]);
  return null;
}
function App() {
  return (
    <Router>
      <ScrollToTop/>
      <Switch>
        <Route exact path="/" component={Home}/>
        {/* Needs to be privateroute from here*/}
        <Route path="/dashboard" component={Dashboard}/>
        <Route path="/QRCode" component={UserQR}/>

        {/* ADMIN APP: This route can only be viewed by secured logins */}
        <Route path="/certified" component={AdminLogin} />
        <Route path="/QR/user=:userID" component={QRRedirect} />

        <Route path="/settings" component={SettingsPage}/>
        
        <MainLayout>
          <Route exact path="/login" component={Login}/>
          {/* Change all to privateRoute later after assimilating login persistence */}
          <Route exact path="/upload-passport" component={PassportUpload}/>
          <Route exact path="/upload-records" component={RecordsUpload}/>
          {/* Accessible only if documents uploaded */}
          <Route path="/pending-review" component={PendingPage}/>
          {/* Accessible on login when document verification complete */}
          {/* Accessible for all verified */}
        </MainLayout>
      </Switch>
    </Router>
  )
}

export default App
