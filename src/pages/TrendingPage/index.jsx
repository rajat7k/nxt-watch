import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { inject, observer } from 'mobx-react';
import Layout from '../../components/Layout'
import Loader from '../../components/Loader';
import BannerComponent from '../../components/Banner';
import { videosDataApis } from '../../constants/ApiConstants';
import { StatusCodes } from '../../constants/StatusCode';
import FailurePage from '../FailurePage';
import VideoCardTrendingPage from './VideoCardTrendingPage';
import './index.css'

const TrendingPage = inject('rootStore')(observer((props) => {

  const { rootStore } = props
  const apiResponse = rootStore.trendingVideoDataFetchStore.videoDataApiResponse

  const { t } = useTranslation();

  const getTrendingVideos = async () => {
    const url = videosDataApis.trendingVideoDataApi
    rootStore.trendingVideoDataFetchStore.fetchVideoData(url)

  }

  function showTrendingVideos() {
    return <div className="trending-page">
      <BannerComponent iconName='trending-icon' > {t('Trending')} </BannerComponent>
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
}))

export default TrendingPage