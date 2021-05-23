import React from 'react'
import './NewsContainer.scss'

function NewsContainer({ title, source, url, urlToImage}) {
  return (
    <a href={url} target="_blank" rel="noreferrer" className="news-article">
      <div className="news-text">
        <h4>{title}</h4>
        <p>{source.name}</p>
      </div>
      <figure>
        <img src={urlToImage} alt={title} />
      </figure>
    </a>
  )
}

export default NewsContainer
