import React from 'react'
import { GrLocation } from 'react-icons/gr'
import './LatestNews.scss'

function LatestNews() {
  return (
    <div id="latest-news">
      <h3>Latest Covid Updates</h3>
      <div className="news-location">
        <GrLocation/>
        <p>Canada</p>
      </div>
      <div className="divider" />

      {/* Get news */}

    </div>
  )
}

export default LatestNews
