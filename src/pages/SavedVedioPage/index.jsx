import React, { useContext } from 'react'
import Layout from '../../components/Layout'
import StoreContext from '../../Context'
import BannerComponent from '../../components/Banner'
import SavedVideoCard from './SavedVideoCard'
import './index.css'

export default function SavedVideosPage() {

  // function
  const { savedVideos, currentTheme } = useContext(StoreContext)
  return (
    <Layout>
      {
        savedVideos.length === 0 ?
          <div className='no-saved-video-container' style={{ color: currentTheme?.normalTextColor }} >
            <img className='no-saved-video-img' src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png" alt="" />
            <p className="no-saved-videos-heading"  >
              No Saved Videos Found
            </p>
            <p className="no-saved-videos-para"  >
              You can save your vedios while watching them
            </p>
          </div> :
          <div className="savedVideo-page" >
            <BannerComponent iconName='saved-video-icon' >Saved Videos</BannerComponent>
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
