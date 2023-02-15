import React, { useEffect, useState } from 'react'
import BannerComponent from '../../components/Banner';
import Layout from '../../components/Layout'
import Loader from '../../components/Loader';
import { videosDataApis } from '../../constants/ApiConstants';
import { doApiCallForVideosData } from '../../utils/ApiUtils/VideosDataApi';
import FailurePage from '../FailurePage';
import VideoCardGamingPage from './VedioCardGamingPage';
import './index.css'


export default function GamingPage() {

  const [apiResponse, setApiResponse] = useState({});


  const getGamingVideos = async () => {
    try {
      const videoData = await doApiCallForVideosData(videosDataApis.gamingVideoDataApi)
      setApiResponse(videoData)
    }
    catch (err) {
      setApiResponse({});
    }
  }

  function showGamingVideos() {
    return <div className="gaming-page">
      <BannerComponent iconName='gaming-icon' >Gaming</BannerComponent>
      <div className="gaming-page-vedio-container">
        {
          apiResponse.videoDataArray.map((video) => {
            return <VideoCardGamingPage key={video.id} video={video} />
          })
        }
      </div>
    </div>
  }


  useEffect(() => {
    getGamingVideos();
  }, [])

  return (
    <Layout>
      {

        apiResponse.statusCode === '200' ? showGamingVideos() : apiResponse.statusCode === '400' ? <FailurePage retryFetchingData={getGamingVideos} /> : <Loader />

      }
    </Layout>
  )
}
