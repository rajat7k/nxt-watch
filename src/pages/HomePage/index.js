import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import Loader from '../../components/Loader';
import { videosDataApis } from '../../constants/ApiConstants';
import StoreContext from '../../Context';
import { doApiCallForVideosData } from '../../utils/ApiUtils/VideosDataApi';
import FailurePage from '../FailurePage';
import './index.css'
import VideoCardHomePage from './VedioCardHomePage';

export default function HomePage() {

  const [apiResponse, setApiResponse] = useState({});
  const [displayBannerBox, setDisplayBannerBox] = useState("block")
  const [searchValue, setSearchValue] = useState('')

  const { currentTheme } = useContext(StoreContext);

  const getHomeVediosData = async (value = '') => {
    try {
      const videoData = await doApiCallForVideosData(videosDataApis.homePageVideoDataApi, value)
      setApiResponse(videoData)
    }
    catch (err) {
      setApiResponse({});
    }
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
      <img className='banner-nxtwatch-logo' src='https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png' alt="" />
      <p className='banner-paragraph' >Buy Nxt Watch Premium prepaid plan with <br /> UPI</p>
      <div className='banner-get-it-now-btn' >GET IT NOW</div>

      <button onClick={handleClickOnCloseBannerBtn} className='banner-close-btn' ><img className='banner-close-icon' src="https://res.cloudinary.com/dbdaib57x/image/upload/v1675919033/close-x-10324_ii9kif.png" alt="" /></button>
    </div>
  }

  function noSearchContainer() {
    return <div className="no-search-page" style={{
      color: currentTheme?.normalTextColor
    }}>
      <img className='no-search-image' src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png" alt="no videos" />
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
        ><img src="https://res.cloudinary.com/dbdaib57x/image/upload/v1675920579/search-2903_hsltcx.png" alt="" /></div>
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
  }, [])

  return (
    <Layout>
      {apiResponse.statusCode === '400' ? <FailurePage retryFetchingData={getHomeVediosData} /> :
        apiResponse.statusCode === '200' ? showHomeVideos() : <Loader />
      }

    </Layout>
  )
}
