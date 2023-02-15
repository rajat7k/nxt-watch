import React, { useContext } from 'react'
import StoreContext from '../../Context'
import './index.css'

function FailurePage(props) {
  const {retryFetchingData}=props
  const {currentTheme}=useContext(StoreContext)

  function handleClickOnRetryBtn(){
    retryFetchingData();
  }

  return (
    <div className='failure-page-video-container' style={{ color: currentTheme?.normalTextColor }} >
            <img className='failure-page-video-img' src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png" alt="" />
            <p className="failure-page-videos-heading" >
              Oops! Something Went Wrong
            </p>
            <p className="failure-page-videos-para"   >
              We are having some trouble to complete your request.
              Please try again.
            </p>
            <button onClick={handleClickOnRetryBtn} className='failure-page-retry-btn' >Retry</button>
          </div> 
  )
}

export default FailurePage