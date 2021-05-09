import React from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../../context'

import './Home.scss'

function Home() {
  const { setShowSignup } = useGlobalContext();
  return (
    <main>
      <div className="header">
        <h1 className="logo">Vaxport</h1>
      </div>
      <div className="home-intro">
        <h2>Say hello to Vaxport! Globally approved Covid-19 vaccine certification passport platform.</h2>
        <p>We get rid of struggles proving your vaccination record. Make your business trip and vacation more seamlessly</p>

        <Link to="/login"><button className="home-btn" onClick={() => setShowSignup(true)}>GET STARTED</button></Link>
        <Link to="/login"><button className="button-2" onClick={() => setShowSignup(false)}>LOGIN</button></Link>
      </div>
      <div className="home-extra">
        <h3>How it works</h3>

      </div>
    </main>
  )
}

export default Home
