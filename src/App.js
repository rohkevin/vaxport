import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


import PrivateRoute from './PrivateRoute'

import Home from './Pages/Home/Home.js'
import Login from './Pages/Login/Login.js'
import MainLayout from './Components/MainLayout/MainLayout.js'
import PassportUpload from './Pages/PassportUpload/PassportUpload.js'
import RecordsUpload from './Pages/RecordsUpload/RecordsUpload.js'
import PendingPage from './Pages/PendingPage/PendingPage.js'
import Dashboard from './Pages/Dashboard/Dashboard.js'
import UserQR from './Pages/UserQR/UserQR'
import QRRedirect from './Pages/QRRedirect/QRRedirect'
import './theme.scss'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
        {/* Needs to be privateroute from here*/}
        <Route path="/dashboard" component={Dashboard}/>
        <Route path="/QRCode" component={UserQR}/>

        {/* This route can only be viewed by secured logins */}
        <Route path="/QR/user=:user" component={QRRedirect} />
        
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
