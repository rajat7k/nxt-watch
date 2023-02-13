import React, { useContext, useEffect, useState } from 'react'
import ReactPlayer from 'react-player/youtube'
import { useParams } from 'react-router-dom'
import GetYearDifference from '../../components/GetYearDifference';
import Icons from '../../components/Icons';
import Layout from '../../components/Layout'
import Loader from '../../components/Loader';
import StoreContext from '../../Context';
import './index.css'

export default function VideoDetailPage() {

  const params = useParams();
  const videoId = params.id;
  const [videoDetails, setVideoDetail] = useState(null);
  const [isVideoLiked, setIsVideoLiked] = useState(false);
  const [isVideoDisliked, setIsVideoDisliked] = useState(false);
  const [isVideoSaved, setIsVideoSaved] = useState(false);

  const { handleSavedVideosData, handleLikedVediosData, handleDisLikedVediosData, likedVideos, dislikedVideos, savedVideos, currentTheme } = useContext(StoreContext)

  const getVideoDetails = async () => {

    const URL = 'https://apis.ccbp.in/videos/' + videoId;
    try {
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }).then(result => { return result.json() }).catch(err => console.log(err));

      setVideoDetail(response.video_details);
    }
    catch (err) {
      console.log(err)
    }
  }

  function handleClickOnSavedBtn() {
    if (isVideoSaved) {
      setIsVideoSaved(false)
      handleSavedVideosData(videoDetails)
    }
    else {
      setIsVideoSaved(true);
      handleSavedVideosData(videoDetails)
    }
  }

  function handleClickOnLikedBtn() {
    if (isVideoDisliked) {
      handleClickOnDislikeBtn()
    }
    setIsVideoLiked(!isVideoLiked)
    handleLikedVediosData(videoDetails?.id);

  }

  function handleClickOnDislikeBtn() {
    if (isVideoLiked) {
      handleClickOnLikedBtn()
    }
    setIsVideoDisliked(!isVideoDisliked)
    handleDisLikedVediosData(videoDetails?.id);

  }

  useEffect(() => {
    getVideoDetails();
    // eslint-disable-next-line 
  }, [])
  useEffect(() => {
    if (savedVideos.some(item => item.id === videoDetails?.id)) {
      setIsVideoSaved(true)
    }
    if (likedVideos.some(id => id === videoDetails?.id)) {
      setIsVideoLiked(true);
    }
    if (dislikedVideos.some(id => id === videoDetails?.id)) {
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
              <ReactPlayer url={videoDetails.video_url} width='100%' height='100%' />
            </div>
            <div className='vedio-detail-description-box' >
              <p style={{ color: currentTheme?.normalTextColor }} > {videoDetails.title} </p>
              <div className="view-count-and-btn-box">

                <p style={{ color: currentTheme?.videoDetailColor }}  > {videoDetails.view_count} views .  {<GetYearDifference pastDate={videoDetails?.published_at} />} years ago </p>

                <div className="like-dislike-btn-box">
                  <button onClick={handleClickOnLikedBtn} className="like-box" style={{ color: isVideoLiked ? '#ff0b37' : 'inherit' }}>
                    {<Icons iconName='like-icon' iconColor={isVideoLiked ? '#ff0b37' : '#64748b'} />}
                    {isVideoLiked ? "Liked" : "Like"}
                  </button>
                  <button className="dislike-box" onClick={handleClickOnDislikeBtn} style={{ color: isVideoDisliked ? '#ff0b37' : 'inherit' }} >
                    {<Icons iconName='dislike-icon' iconColor={isVideoDisliked ? '#ff0b37' : '#64748b'} />}
                    {isVideoDisliked ? "Disliked" : "Dislike"}
                  </button>
                  <button onClick={handleClickOnSavedBtn} className="save-video-box" style={{ color: isVideoSaved ? '#ff0b37' : 'inherit' }}>
                    {<Icons iconName='save-video-icon' iconColor={isVideoSaved ? '#ff0b37' : '#64748b'} />}

                    {isVideoSaved ? "Saved" : "Save"}
                  </button>
                </div>
              </div>

              <hr color={currentTheme?.videoDetailColor} />

              <div className="video-detail-profile-box">
                <div>
                  <img className='vedio-detail-page-profile-img' src={videoDetails.channel.profile_image_url} alt="" />
                  <div className="video-detail-profile-channel-name-box">
                    <p style={{ color: currentTheme?.normalTextColor }}>
                      {videoDetails.channel.name}
                    </p>
                    <p style={{ color: currentTheme?.videoDetailColor }}  > {videoDetails.channel.subscriber_count} subscribers
                    </p>
                  </div>
                </div>
                <div style={{ color: currentTheme.themeName === 'light' ? '#475569' : '#ffffff' }} className='video-detail-profile-description' >
                  {videoDetails.description}
                </div>
              </div>
            </div>
          </div>
      }

    </Layout >
  )
}
