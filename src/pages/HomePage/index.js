import {useMachine } from '@xstate/react';
import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import Loader from '../../components/Loader';
import { videosDataApis } from '../../constants/ApiConstants';
import { ImageUrl } from '../../constants/ImgageUrlConstants';
import StoreContext from '../../Context';
import FailurePage from '../FailurePage';
import { StatusCodes } from '../../constants/StatusCode';
import { videoDataFetchMachine } from '../../machine/videoDataFetchMachine';
import VideoCardHomePage from './VedioCardHomePage';
import './index.css'



export default function HomePage() {

  const [displayBannerBox, setDisplayBannerBox] = useState("block")
  const [searchValue, setSearchValue] = useState('')


  const { currentTheme, } = useContext(StoreContext);
  
  const [state,send]=useMachine(videoDataFetchMachine);
  const apiResponse=state.context.videoDataApiResponse

  const getHomeVediosData =(value = '')=> {
    send({
      type:'GET_VIDEO_DATA',
      url:videosDataApis.homePageVideoDataApi+value,
    })
  }

  function handleClickOnCloseBannerBtn() {
    setDisplayBannerBox('none')
  }

  function handleChangesOnSearchBox(event) {
    setSearchValue(event.target.value)
  }
  
  function handleClickOnSearchIcon() {
    getHomeVediosData(searchValue)
  }

  function homeBanner() {
    return <div className='bannerBox' style={{ display: displayBannerBox }}>
      <img className='banner-nxtwatch-logo' src={ImageUrl.nxtwatchLogoUrl} alt="" />
      <p className='banner-paragraph' >Buy Nxt Watch Premium prepaid plan with <br /> UPI</p>
      <div className='banner-get-it-now-btn' >GET IT NOW</div>

      <button onClick={handleClickOnCloseBannerBtn} className='banner-close-btn' ><img className='banner-close-icon' src={ImageUrl.homeBannerCloseIcon} alt="" /></button>
    </div>
  }

  function noSearchContainer() {
    return <div className="no-search-page" style={{
      color: currentTheme?.normalTextColor
    }}>
      <img className='no-search-image' src={ImageUrl.homeNoSearchResultImage} alt="no videos" />
      <h2>No Search results Found</h2>
      <p>Try different key words or remove search filter</p>
      <button onClick={getHomeVediosData} >Retry</button>
    </div>
  }

  function showHomeVideos() {
    return <div className="home-page" style={{ backgroundColor: currentTheme?.homeBackgroundColor }}>

      {homeBanner()}

      {/* input contanier  */}
      <div className="home-input-container">
        <input onChange={handleChangesOnSearchBox} value={searchValue} type="text" placeholder='Search' />
        <div onClick={handleClickOnSearchIcon}
          style={{ backgroundColor: currentTheme?.searchBarIconBgColor }}
        ><img src={ImageUrl.homeSearchIcon} alt="" /></div>
      </div>
      {
        apiResponse.videoDataArray.length === 0 ? noSearchContainer()
          :
          // showing videos
          <div className="home-page-vedio-container">
            {
              apiResponse.videoDataArray.map((video) => {
                return <VideoCardHomePage key={video.id} video={video} />
              })
            }
          </div>
      }
    </div>
  }


  useEffect(() => {
    getHomeVediosData();
    // eslint-disable-next-line
  }, [])

  return (
    <Layout>
      {apiResponse.statusCode >= StatusCodes.errorCode ? <FailurePage retryFetchingData={getHomeVediosData} /> :
        apiResponse.statusCode === StatusCodes.successCode ? showHomeVideos() : <Loader />
      }

    </Layout>
  )
}
