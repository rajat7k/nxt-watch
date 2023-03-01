import { inject, observer } from 'mobx-react';
import queryString from 'query-string';
import React, { useContext, useState } from 'react'
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';
import { StatusCodes } from '../../constants/StatusCode';
import StoreContext from '../../Context';

import './index.css'

const LoginPage=inject('rootStore')(observer((props)=> {

    const {rootStore}=props
    const apiResponse=rootStore.authStore.response
    console.log(apiResponse,"loginPage")

    const navigate = useNavigate()
    const location = useLocation();

    const {t}=useTranslation();

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordType, setPasswordType] = useState(false)

    const { currentTheme } = useContext(StoreContext);

    const { redirectTo } = queryString.parse(location.search);



    function onChangeUserName(event) {
        setUserName(event.target.value)
    }
    function onChangePassword(event) {
        setPassword(event.target.value)
    }

    function handleClickOnShowPasswordInput() {
        setPasswordType(!passwordType)
    }


    function handleClickOnLoginBtn() {
        const userDetails= {
            "username": userName,
            "password": password
        }
        rootStore.authStore.tryLogin(userDetails);
    }

    function loginCard() {
        return <div className="login-card" style={{
            boxShadow: currentTheme?.themeName === 'dark' ? "none" : '',
            background: currentTheme?.themeName === 'dark' ? '#000000' : '#ffffff',
            color: currentTheme?.normalTextColor
        }} >
            <div className="login-logo">
                <img className='login-logo-light' src={currentTheme?.nxtwatchLogo} alt="" />
            </div>
            <div className="login-input-box">
                <p> {t('username').toUpperCase()} </p>
                <input onChange={onChangeUserName} value={userName} type="text" placeholder={t('username')} />
            </div>
            <div className="login-input-box">
                <p> {t('password').toUpperCase()} </p>
                <input onChange={onChangePassword} value={password} type={passwordType ? 'text' : 'password'} placeholder={t('password')} />
            </div>
            <div className="show-password-box" onClick={handleClickOnShowPasswordInput}>
                <input onChange={e => { }} checked={passwordType} type="checkbox" />
                <label htmlFor=""> {t('show')} { t('password') }</label>
            </div>
            <button onClick={handleClickOnLoginBtn} className='login-btn'> {t('login')} </button>
            {apiResponse?.errorMsg && <p className='login-error-msg' > *{apiResponse?.errorMsg} </p>}
        </div>
    }

    function goToHomePage() {
        navigate(redirectTo !== undefined ? redirectTo : '/');
    }

    return (
        <div className="login-page" style={{ background: currentTheme?.themeName === 'dark' ? '#212121' : '#ffffff' }}>


            {apiResponse.statusCode === StatusCodes.processingCode && <div className="loginLoader"><Loader /></div>}

            {apiResponse.statusCode === StatusCodes.successCode && goToHomePage()}

            {loginCard()}

        </div>
    )
}))

export default LoginPage