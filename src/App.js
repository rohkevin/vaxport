import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './Pages/Home/Home.js'
import Login from './Pages/Login/Login.js'
import MainLayout from './Components/MainLayout/MainLayout.js'
import UploadPage from './Pages/UploadPage/UploadPage.js'
import PendingPage from './Pages/PendingPage/PendingPage.js'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/login" component={Login}/>
        {/* Needs to be privateroute from here*/}
        <MainLayout>
          <Route exact path="/upload" component={UploadPage}/>
          <Route path="/pending-review" component={PendingPage}/>
        </MainLayout>
      </Switch>
    </Router>
  )
}

export default App
