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
import QRCode from './Pages/QRCode/QRCode'
import './theme.scss'
import { useAuth } from './Auth'

function App() {
  const { currentUser } = useAuth();
  return (
    <Router>
      {/* <p>{ currentUser ? currentUser.email : 'not logged in' }</p> */}
      
      <Switch>
        
        <Route exact path="/" component={Home}/>
        {/* Needs to be privateroute from here*/}
        <Route path="/dashboard" component={Dashboard}/>
        <Route path="/QRCode" component={QRCode}/>
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
