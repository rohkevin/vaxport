import React from 'react'
import { Link } from 'react-router-dom'

import './Home.scss'

function Home() {
  return (
    <main>
      <div className="header">
        <h1 className="logo">Vaxport</h1>
      </div>
      <Link to="/login"><button className="home-btn">GET STARTED</button></Link>
      <Link to="/login"><button className="button-2">Sign Up</button></Link>
    </main>
  )
}

export default Home
