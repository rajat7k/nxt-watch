import React, { useContext } from 'react'
import Layout from '../../components/Layout'
import StoreContext from '../../Context'
import BannerComponent from '../../components/Banner'
import SavedVideoCard from './SavedVideoCard'
import './index.css'
import { useActor } from '@xstate/react'
import { useTranslation } from 'react-i18next'

export default function SavedVideosPage() {

  // function
  const { currentTheme, userStateMachine } = useContext(StoreContext)
  const [state,] = useActor(userStateMachine);

  const { t } = useTranslation();

  const savedVideos = state.context.savedVideos
  return (
    <Layout>
      {
        savedVideos.length === 0 ?
          <div className='no-saved-video-container' style={{ color: currentTheme?.normalTextColor }} >
            <img className='no-saved-video-img' src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png" alt="" />
            <p className="no-saved-videos-heading"  >
              {t('no saved videos found')}
            </p>
            <p className="no-saved-videos-para"  >
              {t('footer_msg')}
            </p>
          </div> :
          <div className="savedVideo-page" >
            <BannerComponent iconName='saved-video-icon' > {t('Saved Videos')} </BannerComponent>
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
