import React from 'react'
import { Link } from 'react-router-dom';
import './index.css'

export default function VideoCardTrendingPage(props) {

    const { video } = props
    const { id, title, thumbnail_url, view_count, channel } = video;
    const { name, profile_image_url } = channel;
    return (
        <Link to={`/video/detail/${id}`} className='link-trending-vedio'>
            <img className='trending-vedio-card-thumbnail' src={thumbnail_url} alt="" />
            <div className='trending-vedio-card-detail-container' >
                <img className='trending-vedio-card-profile-img' src={profile_image_url} alt="" />
                <div className='trending-vedio-card-title-box' >
                    <p className='trending-vedio-card-title'> {title} </p>
                    <div className='trending-vedio-card-name-box' >
                        <p className='trending-vedio-card-name'> {name} </p>
                        <p className='trending-vedio-card-vedio-count' > {view_count} views <span>.</span> 5 years ago </p>
                    </div>
                </div>
            </div>
        </Link>
    )
}
