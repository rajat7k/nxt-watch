import React from 'react'
import { Link } from 'react-router-dom';
import './index.css'
export default function VideoCardGamingPage(props) {
    const { video } = props
    const { id, thumbnail_url, title, view_count } = video;
    return (
        <Link to={`/video/detail/${id}`} className="gaming-page-video-card">
            <img className='gaming-page-card-img' src={thumbnail_url} alt="" />
            <p className='gaming-page-card-title' > {title} </p>
            <p className='gaming-page-card-viewcount'> {view_count} watching worldwide </p>
        </Link>
    )
}
