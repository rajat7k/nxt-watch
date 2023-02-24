import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import StoreContext from '../../Context'
import './index.css'

function FailurePage(props) {
  const {retryFetchingData}=props
  const {currentTheme}=useContext(StoreContext)
  const {t}=useTranslation();

  function handleClickOnRetryBtn(){
    retryFetchingData();
  }

  return (
    <div className='failure-page-video-container' style={{ color: currentTheme?.normalTextColor }} >
            <img className='failure-page-video-img' src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png" alt="" />
            <p className="failure-page-videos-heading" >
              {t('something_wrong_msg')}
            </p>
            <p className="failure-page-videos-para"   >
              {t('something_wrong_msg_detail')}
            </p>
            <button onClick={handleClickOnRetryBtn} className='failure-page-retry-btn' > {t('retry')} </button>
          </div> 
  )
}

export default FailurePage