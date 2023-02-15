import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import Loader from '../../components/Loader';
import BannerComponent from '../../components/Banner';
import { doApiCallForVideosData } from '../../utils/ApiUtils/VideosDataApi';
import { videosDataApis } from '../../constants/ApiConstants';
import FailurePage from '../FailurePage';
import VideoCardTrendingPage from './VideoCardTrendingPage';
import './index.css'

export default function TrendingPage() {

  const [apiResponse, setApiResponse] = useState({});

  const getTrendingVideos = async () => {
    try {
      const videoData = await doApiCallForVideosData(videosDataApis.trendingVideoDataApi)
      setApiResponse(videoData)
    }
    catch (err) {
      setApiResponse({});
    }
  }

  function showTrendingVideos() {
    return <div className="trending-page">
      <BannerComponent iconName='trending-icon' >Trending</BannerComponent>
      <div className="trending-page-vedio-container">
        {
          apiResponse.videoDataArray.map((video) => {
            return <VideoCardTrendingPage key={video.id} video={video} />
          })
        }
      </div>
    </div>
  }


  useEffect(() => {
    getTrendingVideos();
  }, [])

  return (
    <Layout>
      {

        apiResponse.statusCode === '200' ? showTrendingVideos() : apiResponse.statusCode === '400' ? <FailurePage retryFetchingData={getTrendingVideos} /> : <Loader />

      }
    </Layout>
  )
}
