import queryString from 'query-string';
import React, { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';
import { loginApi } from '../../constants/ApiConstants';
import StoreContext from '../../Context';
import './index.css'

export default function LoginPage() {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordType, setPasswordType] = useState('password')
    const [apiErrorResponse, setApiErrorResponse] = useState('');
    const { currentTheme } = useContext(StoreContext)
    const [showLoader, setShowLoader] = useState(false);
    const navigate = useNavigate()
    const location =useLocation();
    const { redirectTo } = queryString.parse(location.search);
    

    function onChangeUserName(event) {
        setUserName(event.target.value)
    }
    function onChangePassword(event) {
        setPassword(event.target.value)
    }

    function handleClickOnShowPasswordInput() {
        if (passwordType !== 'text') {
            setPasswordType('text')
        }
        else {
            setPasswordType('password')
        }
    }


    const validateUserOnServer = async () => {
        try {
            const userDetails = {
                "username": userName,
                "password": password
            }
            const response = await fetch(loginApi, {
                method: "POST",
                body: JSON.stringify(userDetails)
            }).then(result => { return result.json() }).catch(err => console.log(err))


            if (response.status_code === 400) {
                console.log(response.error_msg)
                setApiErrorResponse(response.error_msg)
            }
            else {
                localStorage.setItem("token", response.jwt_token)
                setPassword('');
                setUserName('');
                navigate(redirectTo!==undefined?redirectTo:'/');

            }

        }
        catch (err) {
            console.log(err);
        }
        setShowLoader(false)
    }


    function handleClickOnLoginBtn() {
        setShowLoader(true);
        validateUserOnServer();

    }
    return (
        <div className="login-page" style={{ background: currentTheme?.themeName === 'dark' ? '#212121' : '#ffffff' }}>

            {showLoader && <div className="loginLoader"><Loader /></div>}

            <div className="login-card" style={{
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
                    <input onChange={onChangePassword} value={password} type={passwordType} placeholder='Password' />
                </div>
                <div className="show-password-box" onClick={handleClickOnShowPasswordInput}>
                    <input checked={passwordType !== 'text' ? false : true} type="checkbox" />
                    <label htmlFor="">Show Password</label>
                </div>
                <button onClick={handleClickOnLoginBtn} className='login-btn'>Login</button>
                {apiErrorResponse !== '' && <p className='login-error-msg' > *{apiErrorResponse} </p>}
            </div>
        </div>
    )
}
