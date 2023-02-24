import { useActor } from '@xstate/react';
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import ReactPlayer from 'react-player/youtube'
import { useParams } from 'react-router-dom'

import Icons from '../../components/Icons';
import Layout from '../../components/Layout'
import Loader from '../../components/Loader';
import { videoDetailApi } from '../../constants/ApiConstants';
import StoreContext from '../../Context';
import GetYearDifference from '../../utils/GetYearDifferenceUtil';
import './index.css'

export default function VideoDetailPage() {

  const params = useParams();
  const videoId = params.id;
  const [isVideoLiked, setIsVideoLiked] = useState(false);
  const [isVideoDisliked, setIsVideoDisliked] = useState(false);
  const [isVideoSaved, setIsVideoSaved] = useState(false);

  const { t } = useTranslation();

  const { currentTheme, userStateMachine } = useContext(StoreContext)

  const [state, send] = useActor(userStateMachine);

  const videoDetails = state.context.videoDetail

  const getVideoDetails = async () => {
    send({
      type: 'GET_VIDEO_DETAIL',
      url: videoDetailApi + videoId,
    })

  }

  function handleClickOnSavedBtn() {
    send({
      type: 'SAVE_VIDEO',
      video: videoDetails?.data
    });
    setIsVideoSaved(!isVideoSaved)
  }

  function handleClickOnLikedBtn() {
    if (isVideoDisliked) {
      handleClickOnDislikeBtn()
    }
    setIsVideoLiked(!isVideoLiked)
    send({
      type: 'LIKED_VIDEO',
      id: videoId,
    })

  }

  function handleClickOnDislikeBtn() {
    if (isVideoLiked) {
      handleClickOnLikedBtn()
    }
    setIsVideoDisliked(!isVideoDisliked)
    send({
      type: 'DISLIKED_VIDEO',
      id: videoId,
    })

  }

  useEffect(() => {
    getVideoDetails();
    // eslint-disable-next-line 
  }, [])


  useEffect(() => {
    const { savedVideos, likedVideos, dislikedVideos } = state.context;
    if (savedVideos.some(item => item.id === videoId)) {
      setIsVideoSaved(true)
    }
    if (likedVideos.some(id => id === videoId)) {
      setIsVideoLiked(true);
    }
    if (dislikedVideos.some(id => id === videoId)) {
      setIsVideoDisliked(true)
    }
    // eslint-disable-next-line
  }, [videoDetails])


  return (
    <Layout>

      {
        videoDetails === null ? <Loader /> :
          <div className='videoDetailPage' style={{ backgroundColor: currentTheme?.allPageBgColor }} >
            <div className='react-player' >
              <ReactPlayer url={videoDetails?.data?.video_url} width='100%' height='100%' />
            </div>
            <div className='vedio-detail-description-box' >
              <p style={{ color: currentTheme?.normalTextColor }} > {videoDetails?.data?.title} </p>
              <div className="view-count-and-btn-box">

                <p style={{ color: currentTheme?.videoDetailColor }}  > {videoDetails?.data?.view_count} {t('views')} .  {GetYearDifference(videoDetails?.data?.published_at)} {t('years_age')} </p>

                <div className="like-dislike-btn-box">
                  <button onClick={handleClickOnLikedBtn} className="like-box" style={{ color: isVideoLiked ? '#3b82f6' : 'inherit' }}>
                    {<Icons iconName='like-icon' iconColor={isVideoLiked ? '#3b82f6' : '#64748b'} />}
                    {isVideoLiked ? `${t('liked')}` : `${t('like')}`}
                  </button>
                  <button className="dislike-box" onClick={handleClickOnDislikeBtn} style={{ color: isVideoDisliked ? '#3b82f6' : 'inherit' }} >
                    {<Icons iconName='dislike-icon' iconColor={isVideoDisliked ? '#3b82f6' : '#64748b'} />}
                    {isVideoDisliked ? `${t('disliked')}` : `${t('dislike')}`}
                  </button>
                  <button onClick={handleClickOnSavedBtn} className="save-video-box" style={{ color: isVideoSaved ? '#3b82f6' : 'inherit' }}>
                    {<Icons iconName='save-video-icon' iconColor={isVideoSaved ? '#3b82f6' : '#64748b'} />}

                    {isVideoSaved ? `${t('saved')}` : `${t('save')}`}
                  </button>
                </div>
              </div>

              <hr color={currentTheme?.videoDetailColor} />

              <div className="video-detail-profile-box">
                <div>
                  <img className='vedio-detail-page-profile-img' src={videoDetails?.data?.channel.profile_image_url} alt="" />
                  <div className="video-detail-profile-channel-name-box">
                    <p style={{ color: currentTheme?.normalTextColor }}>
                      {videoDetails?.data?.channel.name}
                    </p>
                    <p style={{ color: currentTheme?.videoDetailColor }}  > {videoDetails?.data?.channel.subscriber_count} {t('subscriber')}
                    </p>
                  </div>
                </div>
                <div style={{ color: currentTheme.themeName === 'light' ? '#475569' : '#ffffff' }} className='video-detail-profile-description' >
                  {videoDetails?.data?.description}
                </div>
              </div>
            </div>
          </div>
      }

    </Layout >
  )
}
