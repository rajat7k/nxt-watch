import React from 'react'
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import StoreContext from '../../../Context';
import GetYearDifference from '../../../utils/GetYearDifferenceUtil';
import './index.css'

export default function VideoCardHomePage(props) {
    const { video } = props
    const { id, title, thumbnail_url, view_count, channel, published_at } = video;
    const { name, profile_image_url } = channel;
    const { currentTheme } = useContext(StoreContext)
    // console.log(published_at)
    return (
        <Link to={`/video/detail/${id}`} className='link-home-vedio'>
            <img className='home-vedio-card-thumbnail' src={thumbnail_url} alt="" />
            <div className='home-vedio-card-detail-container' >
                <img className='home-vedio-card-profile-img' src={profile_image_url} alt="" />
                <div className='home-vedio-card-title-box' >
                    <p className='home-vedio-card-title' style={{ color: currentTheme.normalTextColor }}> {title} </p>
                    <div className='home-vedio-card-name-box' >
                        <p className='home-vedio-card-name' > {name} </p>
                        <p className='home-vedio-card-vedio-count' >{view_count} . views .{GetYearDifference(published_at)} years ago </p>
                    </div>
                </div>
            </div>
        </Link>
    )
}
