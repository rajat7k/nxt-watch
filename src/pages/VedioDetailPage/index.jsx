import { useActor } from '@xstate/react';
import React, { useContext, useEffect, useState } from 'react'
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
      id: videoDetails?.data?.id,
    })

  }

  function handleClickOnDislikeBtn() {
    if (isVideoLiked) {
      handleClickOnLikedBtn()
    }
    setIsVideoDisliked(!isVideoDisliked)
    send({
      type: 'DISLIKED_VIDEO',
      id: videoDetails?.data?.id,
    })

  }

  useEffect(() => {
    getVideoDetails();
    // eslint-disable-next-line 
  }, [])


  useEffect(() => {
    if (state.context.savedVideos.some(item => item.id === videoId)) {
      setIsVideoSaved(true)
    }
    if (state.context.likedVideos.some(id => id === videoId)) {
      setIsVideoLiked(true);
    }
    if (state.context.dislikedVideos.some(id => id === videoId)) {
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

                <p style={{ color: currentTheme?.videoDetailColor }}  > {videoDetails?.data?.view_count} views .  {GetYearDifference(videoDetails?.data?.published_at)} years ago </p>

                <div className="like-dislike-btn-box">
                  <button onClick={handleClickOnLikedBtn} className="like-box" style={{ color: isVideoLiked ? '#3b82f6' : 'inherit' }}>
                    {<Icons iconName='like-icon' iconColor={isVideoLiked ? '#3b82f6' : '#64748b'} />}
                    {isVideoLiked ? "Liked" : "Like"}
                  </button>
                  <button className="dislike-box" onClick={handleClickOnDislikeBtn} style={{ color: isVideoDisliked ? '#3b82f6' : 'inherit' }} >
                    {<Icons iconName='dislike-icon' iconColor={isVideoDisliked ? '#3b82f6' : '#64748b'} />}
                    {isVideoDisliked ? "Disliked" : "Dislike"}
                  </button>
                  <button onClick={handleClickOnSavedBtn} className="save-video-box" style={{ color: isVideoSaved ? '#3b82f6' : 'inherit' }}>
                    {<Icons iconName='save-video-icon' iconColor={isVideoSaved ? '#3b82f6' : '#64748b'} />}

                    {isVideoSaved ? "Saved" : "Save"}
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
                    <p style={{ color: currentTheme?.videoDetailColor }}  > {videoDetails?.data?.channel.subscriber_count} subscribers
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
