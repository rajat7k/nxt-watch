import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { sideBarMenu } from '../../constants/SideBarMenuConstants';
import StoreContext from '../../Context';
import Icons from '../Icons';
import ModalLogout from '../ModalLogout';
import './index.css'


export default function Layout(props) {

    const { children } = props
    const navigate = useNavigate()
    const location = useLocation();
    const [isLogoutModelOpen, setIsLogoutModelOpen] = useState(false);

    const { currentTheme, handleClickOnDarkTheme } = useContext(StoreContext);


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
                    <img className='layout-app-logo-light' src={currentTheme?.nxtwatchLogo} alt="" /></Link>
                <div className="nav-menu-box">

                    <img onClick={changeTheme}
                        style={{ display: currentTheme?.themeName === 'dark' ? "none" : "block" }}
                        className='darkmode-icon' src="https://res.cloudinary.com/dbdaib57x/image/upload/v1675847022/dark-mode-6682_nwv1yc.png" alt="" />

                    <img onClick={changeTheme}
                        style={{ display: currentTheme?.themeName === 'light' ? "none" : "block" }}
                        className='darkmode-icon'
                        src="https://assets.ccbp.in/frontend/react-js/light-theme-img.png" alt="" />

                    <img className='profile-light' src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png " alt="profile" />

                    <div className='menu-btn-icon'> {
                        <Icons iconName='menu-icon' iconColor={currentTheme?.themeName === 'dark' ? '#ffffff' : '#000'} />
                    }</div>

                    <div className='logout-icon' onClick={handleOpenModal}> {
                        <Icons iconName='logout-icon' iconColor={currentTheme?.themeName === 'dark' ? '#ffffff' : '#000'} />
                    }</div>


                    <button onClick={handleOpenModal} className={`logout-btn ${currentTheme?.themeName}theme-logout-btn`}
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
                            sideBarMenu.map((item) => {
                                const isActive = location.pathname === item.path
                                return <Link to={item.path} key={item.name} className={`menu-item ${isActive && 'active-menu-item'}`}
                                    style={{
                                        color: currentTheme?.normalTextColor,
                                        backgroundColor: isActive ? currentTheme?.menuActiveItmeBackgroundColor : "none",
                                    }}
                                >
                                    {<Icons iconName={item.iconName} iconColor={isActive ? '#ff0000' : currentTheme?.normalTextColor} />}
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
