import React from 'react'
import { Link } from 'react-router-dom';
import './index.css'

export default function SavedVideoCard(props) {

    const { video } = props
    const { id, title, thumbnail_url, view_count, channel } = video;
    const { name, profile_image_url } = channel;
    return (
        <Link to={`/video/detail/${id}`} className='link-savedvideos'>
            <img className='savedvideos-card-thumbnail' src={thumbnail_url} alt="" />
            <div className='savedvideos-card-detail-container' >
                <img className='savedvideos-card-profile-img' src={profile_image_url} alt="" />
                <div className='savedvideos-card-title-box' >
                    <p className='savedvideos-card-title'> {title} </p>
                    <div className='savedvideos-card-name-box' >
                        <p className='savedvideos-card-name'> {name} </p>
                        <p className='savedvideos-card-vedio-count' > {view_count} views <span>.</span> 5 years ago </p>
                    </div>
                </div>
            </div>
        </Link>
    )
}
