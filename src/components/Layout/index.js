import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './index.css'

export default function Layout(props) {

    const { children } = props

    const location = useLocation();

    const menu = [
        {
            name: 'Home',
            path: '/',
            icon: 'https://res.cloudinary.com/dbdaib57x/image/upload/v1675848439/home-icon-png_pdc2f2.png'
        },
        {
            name: 'Trending',
            path: '/trending',
            icon: 'https://res.cloudinary.com/dbdaib57x/image/upload/v1675848545/Pngtree_vector_fire_icon_4147155_casltz.png'
        },
        {
            name: 'Gaming',
            path: '/gaming',
            icon: 'https://res.cloudinary.com/dbdaib57x/image/upload/v1675848459/gamepad_oqcybq.png',
        },
        {
            name: 'Saved Videos',
            path: '/saved-videos',
            icon: 'https://res.cloudinary.com/dbdaib57x/image/upload/v1675848446/add_j1hwz5.png'
        }
    ]

    return (
        <div className="layout-component">
            <div className="layout-header">
                <img className='layout-app-logo-light' src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png" alt="" />
                <div className="nav-menu-box">
                    <img className='darkmode-icon' src="https://res.cloudinary.com/dbdaib57x/image/upload/v1675847022/dark-mode-6682_nwv1yc.png" alt="" />
                    <img className='profile-light' src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png " alt="profile" />

                    <img className='menu-btn-icon' src="https://res.cloudinary.com/dbdaib57x/image/upload/v1675852191/open-menu-6208_dhuu84.png" alt="" />

                    <img className='logout-icon' src="https://res.cloudinary.com/dbdaib57x/image/upload/v1675852173/exit-2860_m3genw.png" alt="" />

                    <button className='logout-btn' >Logout</button>
                </div>
            </div>

            <div className="layout-body">


                <div className="layout-sidebar">

                    <div className="side-bar-menu-container">
                        {
                            menu.map((item) => {
                                const isActive = location.pathname === item.path
                                return <Link to={item.path} className={`menu-item ${isActive && 'active-menu-item'}`} >

                                    <img src={item.icon} alt="" />
                                    <p> {item.name} </p>

                                </Link>
                            })
                        }
                    </div>

                    <div className="side-bar-footer">
                        <h4>CONTACT US</h4>
                        <div className="side-bar-footer-logo-box">
                            <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png " alt="facebook logo" />
                            <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png " alt="twitter logo" />
                            <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png " alt="linkedin logo" />
                        </div>
                        <p>Enjoy! Now to see your <br /> channels and <br /> recommandations </p>
                    </div>

                </div>


                <div className="layout-page-section">
                    {children}
                </div>

            </div>
        </div>
    )
}
