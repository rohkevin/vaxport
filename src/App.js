import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


import PrivateRoute from './PrivateRoute'

import Home from './Pages/Home/Home.js'
import Login from './Pages/Login/Login.js'
import MainLayout from './Components/MainLayout/MainLayout.js'
import CreateProfile from './Pages/CreateProfile/CreateProfile.js'
import UploadPage from './Pages/UploadPage/UploadPage.js'
import PendingPage from './Pages/PendingPage/PendingPage.js'
import ReviewPage from './Pages/ReviewPage/ReviewPage.js'
import Dashboard from './Pages/Dashboard/Dashboard.js'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/login" component={Login}/>
        {/* Needs to be privateroute from here*/}
        <MainLayout>
          <PrivateRoute exact path="/create-profile" component={CreateProfile}/>
          <PrivateRoute exact path="/upload" component={UploadPage}/>
          {/* Accessible only if documents uploaded */}
          <PrivateRoute path="/pending-review" component={PendingPage}/>
          {/* Accessible on login when document verification complete */}
          <PrivateRoute path="/review-status" component={ReviewPage}/>
          {/* Accessible for all verified */}
          <PrivateRoute path="/dashboard" component={Dashboard}/>
        </MainLayout>
      </Switch>
    </Router>
  )
}

export default App
