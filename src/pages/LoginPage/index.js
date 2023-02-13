import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import StoreContext from '../../Context';
import './index.css'

export default function LoginPage() {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordType, setPasswordType] = useState('password')
    const [apiErrorResponse, setApiErrorResponse] = useState('');
    const {currentTheme}=useContext(StoreContext)

    const navigate = useNavigate()

    function onChangeUserName(event) {
        setUserName(event.target.value)
    }
    function onChangePassword(event) {
        setPassword(event.target.value)
    }

    function handleClickOnShowPasswordInput(event) {
        const isChecked = event.target.checked;
        if (isChecked) {
            setPasswordType('text')
        }
        else {
            setPasswordType('password')
        }
    }


    const validateUserOnServer = async () => {
        try {

            const URL = 'https://apis.ccbp.in/login';
            const userDetails = {
                "username": userName,
                "password": password
            }
            const response = await fetch(URL, {
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
                navigate('/');
            }

        }
        catch (err) {
            console.log(err);
        }
    }


    function handleClickOnLoginBtn() {

        validateUserOnServer();

    }
    return (
        <div className="login-page" style={{background:currentTheme?.themeName==='dark'?'#212121':'#ffffff'}}>
            <div className="login-card" style={{
                boxShadow:currentTheme?.themeName==='dark'?"none":'',
                background:currentTheme?.themeName==='dark'?'#000000':'#ffffff',
                color:currentTheme?.normalTextColor
                
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
                <div className="show-password-box" >
                    <input onChange={handleClickOnShowPasswordInput} type="checkbox" />
                    <label htmlFor="">Show Password</label>
                </div>
                <button onClick={handleClickOnLoginBtn} className='login-btn'>Login</button>
                <p className='login-error-msg' > {apiErrorResponse} </p>
            </div>
        </div>
    )
}
