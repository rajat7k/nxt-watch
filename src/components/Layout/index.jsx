import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import StoreContext from '../../Context';
import ModalLogout from '../ModalLogout';
import './index.css'


export default function Layout(props) {

    const { children } = props
    const navigate = useNavigate()
    const location = useLocation();
    const [isLogoutModelOpen, setIsLogoutModelOpen] = useState(false);

    const { currentTheme, handleClickOnDarkTheme } = useContext(StoreContext);

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
    const handleCloseModal = () => {
        setIsLogoutModelOpen(false)
    }

    const handleOpenModal = () => {
        setIsLogoutModelOpen(true)
    }

    const handleLogoutRequest = () => {
        localStorage.removeItem("token");
        navigate('/login');
        handleCloseModal()
    }

    function changeTheme() {
        handleClickOnDarkTheme();
    }

    return (
        <div className="layout-component">
            <ModalLogout
                isOpen={isLogoutModelOpen}
                onRequestClose={handleCloseModal}
                onRequestLogout={handleLogoutRequest}
            />

            <div className="layout-header" style={{ backgroundColor: currentTheme?.layoutBackgroundColor }}>
                <Link to='/' >
                    <img className='layout-app-logo-light' src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png" alt="" /></Link>
                <div className="nav-menu-box">

                    <img onClick={changeTheme}
                        style={{ display: currentTheme?.themeName === 'dark' ? "none" : "block" }}
                        className='darkmode-icon' src="https://res.cloudinary.com/dbdaib57x/image/upload/v1675847022/dark-mode-6682_nwv1yc.png" alt="" />

                    <img onClick={changeTheme}
                        style={{ display: currentTheme?.themeName === 'light' ? "none" : "block" }}
                        className='darkmode-icon'
                        src="https://assets.ccbp.in/frontend/react-js/light-theme-img.png" alt="" />

                    <img className='profile-light' src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png " alt="profile" />

                    <img className='menu-btn-icon' src="https://res.cloudinary.com/dbdaib57x/image/upload/v1675852191/open-menu-6208_dhuu84.png" alt="" />

                    <img className='logout-icon' src="https://res.cloudinary.com/dbdaib57x/image/upload/v1675852173/exit-2860_m3genw.png" alt="" />

                    <button onClick={handleOpenModal} className='logout-btn'
                        style={{
                            color: currentTheme?.themeName === 'dark' ? '#ffffff' : '#3b82f6',
                        }}
                    >Logout</button>
                </div>
            </div>

            <div className="layout-body">

                {/* logout modal */}

                <div className="layout-sidebar" style={{
                    backgroundColor: currentTheme?.layoutBackgroundColor,
                    color: currentTheme?.textColor,
                }}>

                    <div className="side-bar-menu-container">
                        {
                            menu.map((item) => {
                                const isActive = location.pathname === item.path
                                return <Link to={item.path} key={item.name} className={`menu-item ${isActive && 'active-menu-item'}`}
                                    style={{
                                        color: currentTheme?.normalTextColor,
                                        backgroundColor: isActive ? currentTheme?.menuActiveItmeBackgroundColor : "none",
                                    }}
                                >
                                    <img src={item.icon} alt="" />
                                    <p> {item.name} </p>

                                </Link>
                            })
                        }
                    </div>

                    <div className="side-bar-footer">
                        <h3>CONTACT US</h3>
                        <div className="side-bar-footer-logo-box">
                            <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png " alt="facebook logo" />
                            <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png " alt="twitter logo" />
                            <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png " alt="linkedin logo" />
                        </div>
                        <h3>Enjoy! Now to see your <br /> channels and <br /> recommandations </h3>
                    </div>

                </div>


                <div className="layout-page-section" style={{
                    backgroundColor: currentTheme?.allPageBgColor
                }}>
                    {children}
                </div>

            </div>
        </div >
    )
}
