import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import Loader from '../../components/Loader';
import BannerComponent from '../../components/Banner';
import { doApiCallForVideosData } from '../../utils/ApiUtils/VideosDataApi';
import { videosDataApis } from '../../constants/ApiConstants';
import FailurePage from '../FailurePage';
import VideoCardTrendingPage from './VideoCardTrendingPage';
import './index.css'
import { StatusCodes } from '../../constants/StatusCode';
import { useMachine } from '@xstate/react';
import { videoDataFetchMachine } from '../../machine/videoDataFetchMachine';

export default function TrendingPage() {

  const [state, send] = useMachine(videoDataFetchMachine)
  const apiResponse = state.context.videoDataApiResponse

  const getTrendingVideos = async () => {
    send({
      type: 'GET_VIDEO_DATA',
      url: videosDataApis.trendingVideoDataApi,
    })
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
    // eslint-disable-next-line
  }, [])

  return (
    <Layout>
      {

        apiResponse.statusCode === StatusCodes.successCode ? showTrendingVideos() : apiResponse.statusCode >= StatusCodes.errorCode ? <FailurePage retryFetchingData={getTrendingVideos} /> : <Loader />

      }
    </Layout>
  )
}
