import { useActor } from '@xstate/react';
import queryString from 'query-string';
import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';
import { StatusCodes } from '../../constants/StatusCode';
import StoreContext from '../../Context';
import './index.css'

export default function LoginPage() {

    const navigate = useNavigate()
    const location = useLocation();

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordType, setPasswordType] = useState(false)

    const { stateMachine, currentTheme } = useContext(StoreContext);
    const [state, send] = useActor(stateMachine);
    const apiResponse = state.context.loginApiResponse;

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
        send({
            type: 'LOGIN',
            userDetails: {
                "username": userName,
                "password": password
            },
        })

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
                <p>USERNAME</p>
                <input onChange={onChangeUserName} value={userName} type="text" placeholder='Username' />
            </div>
            <div className="login-input-box">
                <p>PASSWORD</p>
                <input onChange={onChangePassword} value={password} type={passwordType ? 'text' : 'password'} placeholder='Password' />
            </div>
            <div className="show-password-box" onClick={handleClickOnShowPasswordInput}>
                <input onChange={e => { }} checked={passwordType} type="checkbox" />
                <label htmlFor="">Show Password</label>
            </div>
            <button onClick={handleClickOnLoginBtn} className='login-btn'>Login</button>
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
}
