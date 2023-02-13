import React from 'react'
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import StoreContext from '../../../Context';
import './index.css'

export default function VideoCardHomePage(props) {
    const { video } = props
    const { id, title, thumbnail_url, view_count, channel } = video;
    const { name, profile_image_url } = channel;
    const { currentTheme } = useContext(StoreContext)

    return (
        <Link to={`/video/detail/${id}`} className='link-home-vedio'>
            <img className='home-vedio-card-thumbnail' src={thumbnail_url} alt="" />
            <div className='home-vedio-card-detail-container' >
                <img className='home-vedio-card-profile-img' src={profile_image_url} alt="" />
                <div className='home-vedio-card-title-box' >
                    <p className='home-vedio-card-title' style={{ color: currentTheme.normalTextColor }}> {title} </p>
                    <div className='home-vedio-card-name-box' >
                        <p className='home-vedio-card-name' > {name} </p>
                        <p className='home-vedio-card-vedio-count' > {view_count} views <span>.</span> 2 years ago </p>
                    </div>
                </div>
            </div>
        </Link>
    )
}
