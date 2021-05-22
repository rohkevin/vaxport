import React from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../../context'

import './Home.scss'

const mainImg = process.env.PUBLIC_URL + '/assets/icons/main.svg'

function Home() {
  const { setShowSignup } = useGlobalContext();
  return (
    <main id="home-page">
      <div className="header">
        <h1 className="logo">Vaxport</h1>
        <Link to="/login"><button className="login-btn" onClick={() => setShowSignup(false)}>Sign in</button></Link>
      </div>
      <div className="home-intro">
        <figure>
          <img src={mainImg} alt="Intro to Vaxport"/>
        </figure>
        <h2>Say hello to Vaxport! Globally approved Covid-19 vaccine certification passport platform.</h2>
        <p>We get rid of struggles proving your vaccination record. Make your business trip and vacation more seamlessly</p>

        <Link to="/login"><button className="home-btn" onClick={() => setShowSignup(true)}>GET STARTED</button></Link>
        
      </div>
    </main>
  )
}

export default Home
