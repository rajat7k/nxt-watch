import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { inject, observer } from 'mobx-react'
import Layout from '../../components/Layout'
import StoreContext from '../../Context'
import BannerComponent from '../../components/Banner'
import { ImageUrl } from '../../constants/ImgageUrlConstants'
import SavedVideoCard from './SavedVideoCard'

import './index.css'


const SavedVideosPage = inject('rootStore')(observer((props) => {

  const { videoDetailStore } = props.rootStore
  const savedVideos = videoDetailStore.savedVideos

  const { currentTheme } = useContext(StoreContext)

  const { t } = useTranslation();


  return (
    <Layout>
      {
        savedVideos.length === 0 ?
          <div className='no-saved-video-container' style={{ color: currentTheme?.normalTextColor }} >
            <img className='no-saved-video-img' src={ImageUrl.noSavedVideoImage} alt="" />
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
}))

export default SavedVideosPage