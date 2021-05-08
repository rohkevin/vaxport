import React from 'react'

import StatusBar from '../StatusBar/StatusBar'

function MainLayout({ children }) {
  return (
    <div>
      <StatusBar />
      { children }
    </div>
  )
}

export default MainLayout
