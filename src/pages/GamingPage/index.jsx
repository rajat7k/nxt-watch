import React, { useEffect } from 'react'
import { useMachine } from '@xstate/react';
import BannerComponent from '../../components/Banner';
import Layout from '../../components/Layout'
import Loader from '../../components/Loader';
import { videosDataApis } from '../../constants/ApiConstants';
import { StatusCodes } from '../../constants/StatusCode';
import { videoDataFetchMachine } from '../../machine/videoDataFetchMachine';
import FailurePage from '../FailurePage';
import VideoCardGamingPage from './VedioCardGamingPage';

import './index.css'
import { useTranslation } from 'react-i18next';


export default function GamingPage() {

  const { t } = useTranslation();

  const [state, send] = useMachine(videoDataFetchMachine)
  const apiResponse = state.context.videoDataApiResponse

  const getGamingVideos = () => {
    send({
      type: 'GET_VIDEO_DATA',
      url: videosDataApis.gamingVideoDataApi,
    })
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
}
