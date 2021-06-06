import React from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import './SettingsPage.scss'

function SettingsPage() {
  return (
    <main id="settings-page" >
      <Link to="/" className="back-home"><FiArrowLeft /><p>Back home</p></Link>
      <div className="max-width">
        Coming Soon!

      </div>
    </main>
  )
}

export default SettingsPage
