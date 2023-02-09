import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import Loader from '../../components/Loader';
import VideoCardTrendingPage from './VideoCardTrendingPage';
import './index.css'

export default function TrendingPage() {

  const [trendingVideos, setTrendingVideos] = useState(null);

  const getTrendingVideos = async () => {
    try {
      const URL = 'https://apis.ccbp.in/videos/trending';
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }).then(result => { return result.json() }).catch(err => console.log(err));
      setTrendingVideos(response.videos)
    }
    catch (err) {
      console.log(err)
    }
  }



  useEffect(() => {
    getTrendingVideos();
  }, [])

  return (
    <Layout>
      {
        trendingVideos === null ? <Loader /> :

          <div className="trending-page">
            <div className="trending-banner">
              <div className="trending-banner-content">
                <div className="trending-banner-logo">

                </div>
                <p className='trending-banner-heading'>Trending</p>
              </div>
            </div>
            <div className="trending-page-vedio-container">
              {
                trendingVideos.map((video) => {
                  return <VideoCardTrendingPage key={video.id} video={video} />
                })
              }
            </div>
          </div>

      }
    </Layout>
  )
}
