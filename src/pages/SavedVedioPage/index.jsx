import React, { useContext } from 'react'
import Layout from '../../components/Layout'
import StoreContext from '../../Context'
import SavedVideoCard from './SavedVideoCard'
import './index.css'

export default function SavedVideosPage() {

  // function
  const { savedVideos } = useContext(StoreContext)
  return (
    <Layout>
      {
        savedVideos.length === 0 ?
          <div className='no-saved-video-container' >
            <img className='no-saved-video-img' src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png" alt="" />
            <p className="no-saved-videos-heading">
              No Saved Videos Found
            </p>
            <p className="no-saved-videos-para">
              You can save your vedios while watching them
            </p>
          </div> :
          <div className="savedVideo-page">
            <div className="savedVideo-banner">
              <div className="savedVideo-banner-content">
                <div className="savedVideo-banner-logo">

                </div>
                <p className='savedVideo-banner-heading'>Saved Videos</p>
              </div>
            </div>
            <div className="savedVideo-page-vedio-container">
              {
                savedVideos.map((video) => {
                  return <SavedVideoCard key={video.id} video={video} />
                })
              }
            </div>
          </div>}
    </Layout>
  )
}
