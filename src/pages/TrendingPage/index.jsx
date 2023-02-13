import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import Loader from '../../components/Loader';
import VideoCardTrendingPage from './VideoCardTrendingPage';
import './index.css'
import BannerComponent from '../../components/Banner';
import FailurePage from '../FailurePage';

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
      setTrendingVideos([])
      console.log(err)
    }
  }



  useEffect(() => {
    getTrendingVideos();
  }, [])

  return (
    <Layout>
      {
        trendingVideos === null ? <Loader /> : trendingVideos.length === 0 ? <FailurePage retryFetchingData={getTrendingVideos} /> :

          <div className="trending-page">
            <BannerComponent iconName='trending-icon' >Trending</BannerComponent>
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
