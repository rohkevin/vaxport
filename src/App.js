import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './Pages/Home/Home.js'
import Login from './Pages/Login/Login.js'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/login" component={Login}/>
      </Switch>
    </Router>
  )
}

export default App
