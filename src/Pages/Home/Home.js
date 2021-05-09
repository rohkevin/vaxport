import React from 'react'
import { Link } from 'react-router-dom'

import './Home.scss'

function Home() {
  return (
    <main>
      <div className="header">
        <h1 className="logo">Vaxport</h1>
      </div>
      <div className="home-intro">
        <h2>Say hello to Vaxport! Globally approved Covid-19 vaccine certification passport platform.</h2>
        <p>We get rid of struggles proving your vaccination record. Make your business trip and vacation more seamlessly</p>

        <Link to="/login"><button className="home-btn">GET STARTED</button></Link>
        <Link to="/login"><button className="button-2">Sign Up</button></Link>
      </div>
      <div className="home-extra">
        <h3>How it works</h3>

      </div>
    </main>
  )
}

export default Home
