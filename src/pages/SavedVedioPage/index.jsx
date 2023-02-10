import React, { useContext } from 'react'
import Layout from '../../components/Layout'
import StoreContext from '../../Context'
import SavedVideoCard from './SavedVideoCard'
import './index.css'

export default function SavedVideosPage() {

  // function
  const { savedVideos } = useContext(StoreContext)
  console.log(savedVideos)
  return (
    <Layout>
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
      </div>
    </Layout>
  )
}
