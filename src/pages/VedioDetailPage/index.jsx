import React, { useContext, useEffect, useState } from 'react'
import ReactPlayer from 'react-player/youtube'
import { useParams } from 'react-router-dom'
import Layout from '../../components/Layout'
import Loader from '../../components/Loader';
import StoreContext from '../../Context';
import './index.css'

export default function VideoDetailPage() {

  const params = useParams();
  const videoId = params.id;
  const [videoDetails, setVideoDetail] = useState(null);
  const [isVideoLiked, setIsVideoLiked] = useState(false);
  const [idVideoDisliked, setVedioDislked] = useState(false);
  const [isVideoSaved, setIsVideoSaved] = useState(false);

  const { handleSavedVideosData, handleLikedVediosData, handleDisLikedVediosData, likedVideos, dislikedVideos, savedVideos } = useContext(StoreContext)

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
      handleSavedVideosData(videoDetails, "remove")
    }
    else {
      setIsVideoSaved(true);
      handleSavedVideosData(videoDetails, "add")
    }
  }

  function handleClickOnLikedBtn() {
    if (isVideoLiked) {
      setIsVideoLiked(false)
      handleLikedVediosData(videoDetails?.id, "remove")
    }
    else {
      setIsVideoLiked(true);
      handleLikedVediosData(videoDetails?.id, "add");
    }
  }

  function handleClickOnDisLikedBtn() {

  }

  useEffect(() => {
    getVideoDetails();
    // eslint-disable-next-line 
  }, [])

  useEffect(() => {
    if (savedVideos.some(item => item.id === videoDetails?.id)) {
      setIsVideoSaved(true)
    }
    if (likedVideos.some(item => item.id === videoDetails?.id)) {
      setIsVideoLiked(true);
    }
    if (dislikedVideos.some(item => item.id === videoDetails.id)) {
      setVedioDislked(true);
    }
    // eslint-disable-next-line
  }, [videoDetails])

  return (
    <Layout>

      {
        videoDetails === null ? <Loader /> :
          <div className='videoDetailPage' >
            <div className='react-player' >
              <ReactPlayer url={videoDetails.video_url} width='100%' height='100%' />
            </div>
            <div className='vedio-detail-description-box' >
              <p> {videoDetails.title} </p>
              <div className="view-count-and-btn-box">

                <p> {videoDetails.view_count} views . 2 years ago </p>

                <div className="like-dislike-btn-box">
                  <button onClick={handleClickOnLikedBtn} className="like-box">
                    <img src="https://res.cloudinary.com/dbdaib57x/image/upload/v1676009412/thumbs-up-11229_wxj4zy.png" alt="" />
                    {isVideoLiked ? "Liked" : "Like"}
                  </button>
                  <button className="dislike-box">
                    <img src="https://res.cloudinary.com/dbdaib57x/image/upload/v1676009411/thumbs-down-14908_czlkep.png" alt="" />
                    {idVideoDisliked ? "Disliked" : "Dislike"}
                  </button>
                  <button onClick={handleClickOnSavedBtn} className="save-video-box">
                    <img src="https://res.cloudinary.com/dbdaib57x/image/upload/v1676009393/add-folder-11514_cv3ijy.png" alt="" />

                    {isVideoSaved ? "Saved" : "save"}
                  </button>
                </div>
              </div>

              <hr />

              <div className="video-detail-profile-box">
                <div>
                  <img className='vedio-detail-page-profile-img' src={videoDetails.channel.profile_image_url} alt="" />
                  <div className="video-detail-profile-channel-name-box">
                    <p> {videoDetails.channel.name} </p>
                    <p> {videoDetails.channel.subscriber_count} subscribers </p>
                  </div>
                </div>
                <div className='video-detail-profile-description' >
                  {videoDetails.description}
                </div>
              </div>
            </div>
          </div>
      }

    </Layout>
  )
}
