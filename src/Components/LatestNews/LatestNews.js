import React, { Fragment, useEffect, useState } from 'react'
import { GrLocation } from 'react-icons/gr'
import './LatestNews.scss'
import { generateDate } from '../../Utils/generateDate'
import NewsContainer from '../NewsContainer/NewsContainer';

function LatestNews() {
  const [news, setNews] = useState(null);

  useEffect(() => {
    var todayDate = generateDate();
    var url = 'https://newsapi.org/v2/top-headlines?' +
      'q=COVID&' +
      `from=${todayDate}&` +
      // 'country=ca&' +
      'sortBy=popularity&' +
      `apiKey=${process.env.REACT_APP_NEWSAPI_KEY}`;

    var req = new Request(url);

    fetch(req)
    .then(function(response) {
      return response.json();
    })
    .then(data => {
      setNews(data.articles.slice(0,5));
    })

  },[])

  
  return (
    <div id="latest-news">
      <h3>Latest Covid Updates</h3>
      <div className="news-location">
        <GrLocation/>
        <p>World</p>
      </div>
      {
        news && 
          news.map((article) => {
            return (
              <Fragment key={article.url}>
                <div className="divider" />
                <NewsContainer key={article.url} {...article} />
              </Fragment>
            )
          })
      }
      {
        !news && <p>This feature is temporarily disabled due to requiring a paid-plan to access the NewsAPI in production mode.</p>
      }
    </div>
  )
}

export default LatestNews
