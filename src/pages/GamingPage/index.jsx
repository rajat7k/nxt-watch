import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { inject, observer } from 'mobx-react';
import BannerComponent from '../../components/Banner';
import Layout from '../../components/Layout'
import Loader from '../../components/Loader';
import { videosDataApis } from '../../constants/ApiConstants';
import { StatusCodes } from '../../constants/StatusCode';
import FailurePage from '../FailurePage';
import VideoCardGamingPage from './VedioCardGamingPage';

import './index.css'



const GamingPage = inject('rootStore')(observer((props) => {

  const { t } = useTranslation();

  const { rootStore } = props
  const apiResponse = rootStore.gamingVideoDataFetchStore.videoDataApiResponse

  const getGamingVideos = () => {
    const url = videosDataApis.gamingVideoDataApi;
    rootStore.gamingVideoDataFetchStore.fetchVideoData(url)
  }

  function showGamingVideos() {
    return <div className="gaming-page">
      <BannerComponent iconName='gaming-icon' > {t('Gaming')} </BannerComponent>
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
    // eslint-disable-next-line
  }, [])

  return (
    <Layout>
      {
        apiResponse.statusCode === StatusCodes.successCode ? showGamingVideos() : apiResponse.statusCode >= StatusCodes.errorCode ? <FailurePage retryFetchingData={getGamingVideos} /> : <Loader />
      }
    </Layout>
  )
}))

export default GamingPage