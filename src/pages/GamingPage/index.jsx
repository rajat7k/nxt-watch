import React, { useEffect, useState } from 'react'
import BannerComponent from '../../components/Banner';
import Layout from '../../components/Layout'
import Loader from '../../components/Loader';
import FailurePage from '../FailurePage';

import './index.css'
import VideoCardGamingPage from './VedioCardGamingPage';

export default function GamingPage() {

  const [gamingVideos, setGamingVideos] = useState(null);


  const getGamingVideos = async () => {
    try {
      const URL = 'https://apis.ccbp.in/videos/gaming';
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }).then(result => { return result.json() }).catch(err => console.log(err));
      setGamingVideos(response.videos)
    }
    catch (err) {
      console.log(err)
    }
  }



  useEffect(() => {
    getGamingVideos();
  }, [])

  return (
    <Layout>
      {
        gamingVideos === null ? <Loader /> : gamingVideos.length === 0 ? <FailurePage retryFetchingData={getGamingVideos} /> :

          <div className="gaming-page">
            <BannerComponent iconName='gaming-icon' >Gaming</BannerComponent>
            <div className="gaming-page-vedio-container">
              {
                gamingVideos.map((video) => {
                  return <VideoCardGamingPage key={video.id} video={video} />
                })
              }
            </div>
          </div>

      }
    </Layout>
  )
}
