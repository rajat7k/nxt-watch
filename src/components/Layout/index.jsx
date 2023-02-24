import React, { useContext, useState } from 'react'
import { useActor } from '@xstate/react';
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { sideBarMenu } from '../../constants/SideBarMenuConstants';
import StoreContext from '../../Context';
import Icons from '../Icons';
import ModalLogout from '../ModalLogout';

import i18n from "../../i18n/i18n"

import './index.css'


export default function Layout(props) {

    const { children } = props
    const navigate = useNavigate()
    const location = useLocation();
    const [isLogoutModelOpen, setIsLogoutModelOpen] = useState(false);

    const { t } = useTranslation()

    const { currentTheme, handleClickOnDarkTheme, userStateMachine } = useContext(StoreContext);
    const [, send] = useActor(userStateMachine);



    const handleCloseModal = () => {
        setIsLogoutModelOpen(false)
    }

    const handleOpenModal = () => {
        setIsLogoutModelOpen(true)
    }

    const handleLogoutRequest = () => {
        send('LOGOUT');
        navigate('/login');
        handleCloseModal()
    }

    function changeTheme() {
        handleClickOnDarkTheme();
    }

    function handleChangeLanguage(event) {
        i18n.changeLanguage(event.target.value);
    }

    function showLayoutHeader() {
        return <div className="layout-header" style={{ backgroundColor: currentTheme?.layoutBackgroundColor }}>
            <Link to='/' >
                <img className='layout-app-logo-light' src={currentTheme?.nxtwatchLogo} alt="" /></Link>
            <div className="nav-menu-box">

                <select onChange={handleChangeLanguage} className='language-dropdown'>
                    <option value="en" selected>English</option>
                    <option value="hi">Hindi</option>
                    <option value="fr" >French</option>
                    <option value="de">German</option>
                </select>

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
                > Logout </button>
            </div>
        </div>
    }

    function showLayoutSideBar() {
        return <div className="layout-sidebar" style={{
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
                            <p> {t(`${item.name}`)} </p>

                        </Link>
                    })
                }
            </div>

            <div className="side-bar-footer">
                <h3> {t('contact_us').toUpperCase()} </h3>
                <div className="side-bar-footer-logo-box">
                    <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png " alt="facebook logo" />
                    <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png " alt="twitter logo" />
                    <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png " alt="linkedin logo" />
                </div>
                <h3> {t('footer_msg')} </h3>
            </div>

        </div>
    }

    return (
        <div className="layout-component">
            <ModalLogout
                isOpen={isLogoutModelOpen}
                onRequestClose={handleCloseModal}
                onRequestLogout={handleLogoutRequest}
            />

            {showLayoutHeader()}

            <div className="layout-body">

                {showLayoutSideBar()}

                <div className="layout-page-section" style={{
                    backgroundColor: currentTheme?.allPageBgColor
                }}>
                    {children}
                </div>

            </div>
        </div >
    )
}
