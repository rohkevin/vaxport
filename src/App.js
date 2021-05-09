import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


import PrivateRoute from './PrivateRoute'

import Home from './Pages/Home/Home.js'
import Login from './Pages/Login/Login.js'
import MainLayout from './Components/MainLayout/MainLayout.js'
import PassportUpload from './Pages/PassportUpload/PassportUpload.js'
import RecordsUpload from './Pages/RecordsUpload/RecordsUpload.js'
import UploadPage from './Pages/UploadPage/UploadPage.js'
import PendingPage from './Pages/PendingPage/PendingPage.js'
import ReviewPage from './Pages/ReviewPage/ReviewPage.js'
import Dashboard from './Pages/Dashboard/Dashboard.js'
import './theme.scss'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
        {/* Needs to be privateroute from here*/}
        <MainLayout>
          <Route exact path="/login" component={Login}/>
          {/* Change all to privateRoute later */}
          <Route exact path="/upload-passport" component={PassportUpload}/>
          <Route exact path="/upload-records" component={RecordsUpload}/>
          {/* <Route exact path="/upload" component={UploadPage}/> */}
          {/* Accessible only if documents uploaded */}
          <Route path="/pending-review" component={PendingPage}/>
          {/* Accessible on login when document verification complete */}
          <Route path="/review-status" component={ReviewPage}/>
          {/* Accessible for all verified */}
        </MainLayout>
        <Route path="/dashboard" component={Dashboard}/>
      </Switch>
    </Router>
  )
}

export default App
