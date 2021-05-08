import React from 'react'
import { Link } from 'react-router-dom'

import './Home.scss'

function Home() {
  return (
    <main>
      <div className="header">
        <h1>Vaxport</h1>
      </div>
      <div className="signup">

        <button className="home-btn">Sign Up</button>
      </div>
    </main>
  )
}

export default Home
