import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { routePath } from '../../../constants/RouteConstants';
import StoreContext from '../../../Context';
import GetYearDifference from '../../../utils/GetYearDifferenceUtil';
import './index.css'

export default function VideoCardTrendingPage(props) {

    const { video } = props
    const { id, title, thumbnail_url, view_count, channel, published_at } = video;
    const { name, profile_image_url } = channel;
    const { currentTheme } = useContext(StoreContext)

    return (
        <Link to={`${routePath.videoDetailPage}/${id}`} className='link-trending-vedio'>
            <img className='trending-vedio-card-thumbnail' src={thumbnail_url} alt="" />
            <div className='trending-vedio-card-detail-container' >
                <img className='trending-vedio-card-profile-img' src={profile_image_url} alt="" />
                <div className='trending-vedio-card-title-box' >
                    <p className='trending-vedio-card-title' style={{
                        color: currentTheme?.normalTextColor
                    }} > {title} </p>
                    <div className='trending-vedio-card-name-box' style={{
                        color: currentTheme?.videoDetailColor
                    }} >
                        <p className='trending-vedio-card-name'> {name} </p>
                        <p className='trending-vedio-card-vedio-count' > {view_count} views <span>.</span> {GetYearDifference(published_at)} years ago </p>

                    </div>
                </div>
            </div>
        </Link>
    )
}
