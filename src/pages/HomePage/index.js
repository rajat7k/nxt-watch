import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import Loader from '../../components/Loader';
import StoreContext from '../../Context';
import './index.css'
import VideoCardHomePage from './VedioCardHomePage';

export default function HomePage() {

  const [videosArray, setVideoArray] = useState(null);
  const [displayBannerBox, setDisplayBannerBox] = useState("block")
  const [searchValue, setSearchValue] = useState('')

  const {currentTheme}=useContext(StoreContext);

  const getHomeVediosData = async (value) => {
    try {
      const URL = 'https://apis.ccbp.in/videos/all?search=' + value;
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }).then(result => { return result.json() }).catch(err => console.log(err));
      setVideoArray(response.videos)
      console.log(response)
    }
    catch (err) {
      console.log(err)
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


  useEffect(() => {
    getHomeVediosData('');
  }, [])

  console.log(currentTheme.homeBackgroundColor);
  return (
    <Layout>
      {
        videosArray === null ? <Loader /> :
          <div className="home-page" style={{backgroundColor:currentTheme?.homeBackgroundColor}}>

            <div className='bannerBox' style={{ display: displayBannerBox }}>
              <img className='banner-nxtwatch-logo' src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png" alt="" />
              <p className='banner-paragraph' >Buy Nxt Watch Premium prepaid plan with <br /> UPI</p>
              <div className='banner-get-it-now-btn' >GET IT NOW</div>

              <button onClick={handleClickOnCloseBannerBtn} className='banner-close-btn' ><img className='banner-close-icon' src="https://res.cloudinary.com/dbdaib57x/image/upload/v1675919033/close-x-10324_ii9kif.png" alt="" /></button>
            </div>

            <div className="home-input-container">
              <input onChange={handleChangesOnSearchBox} value={searchValue} type="text" placeholder='Search' />
              <div onClick={handleClickOnSearchIcon}
              style={{backgroundColor:currentTheme?.searchBarIconBgColor}} 
              ><img src="https://res.cloudinary.com/dbdaib57x/image/upload/v1675920579/search-2903_hsltcx.png" alt="" /></div>
            </div>
            {
              videosArray.length === 0 ?
                <div className="no-search-page">
                  <img className='no-search-image' src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png" alt="no videos" />
                  <h2>No Search results Found</h2>
                  <p>Try different key words or remove search filter</p>
                  <button>Retry</button>
                </div> :
                <div className="home-page-vedio-container">
                  {
                    videosArray.map((video) => {
                      return <VideoCardHomePage key={video.id} video={video} />
                    })
                  }
                </div>
            }
          </div>
      }
    </Layout>
  )
}
