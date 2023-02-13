import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import './index.css'
import StoreContext from '../../../Context';

export default function VideoCardGamingPage(props) {
    const { video } = props
    const { id, thumbnail_url, title, view_count } = video;
    const { currentTheme } = useContext(StoreContext)
    return (
        <Link to={`/video/detail/${id}`} className="gaming-page-video-card">
            <img className='gaming-page-card-img' src={thumbnail_url} alt="" />
            <p className='gaming-page-card-title' style={{
                color: currentTheme?.normalTextColor
            }} > {title} </p>
            <p className='gaming-page-card-viewcount' style={{
                color: currentTheme?.videoDetailColor
            }}> {view_count} watching worldwide </p>
        </Link>
    )
}
