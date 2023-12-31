import React, { useState, useEffect } from 'react'
import MainTitle from '../Title/MainTitle'
import HomeDescription from '../Content/HomeDescription'
import BtnPrimary from '../Button/BtnPrimary'
import BtnTransparent from '../Button/BtnTransparent'
import RegisterForm from '../Form/RegisterForm';
import LoginForm from '../Form/LoginForm'
import 'animate.css/animate.min.css';
import AuthCheck from '../utils/AuthCheck'
import ForgotPassword from '../Form/ForgotPassword'
import ResetPasswordForm from '../Form/ResetPasswordForm';

const Home = () => {
    const [viewRendu, setViewRendu] = useState(false)
    const [viewRegister, setViewRegister] = useState(false);
    const [viewLogin, setViewLogin] = useState(false);
    const [viewLogout, setViewLogout] = useState(false);
    const [viewForgotPassword, setviewForgotPassword] = useState(false)

    const errorMessage = location.state?.errorMessage;
    const [user, setUser] = useState(false)
    const [animationUsername, setAnimationUsername] = useState('')
    const [animationBtnAuth, setAnimationBtnAuth] = useState('')
    const [animationBtnLogout, setAnimationBtnLogout] = useState('')

    const initRegister = () => {
        setViewRegister(!viewRegister);
    };

    const initLogin = () => {
        setViewLogin(!viewLogin);
    };

    const initForgotPassword = () => {
        setviewForgotPassword(!viewForgotPassword);
    }

    const initLogout = async () => {
        try {
            const response = await axios.get('/api/logout');
            if (response.status === 200) {
                setAnimationUsername('animate__fadeOut')
                setAnimationBtnLogout('animate__bounceOutRight')
                setTimeout(() => {
                    setAnimationBtnAuth('animate__fadeInUp')
                    setUser(false)
                    setViewLogout(false)
                }, 1000);
            }
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        async function fetchData() {
            try {
                const isAuthenticated = await AuthCheck();
                console.log(isAuthenticated)
                if (isAuthenticated !== false) {
                    setUser(isAuthenticated);
                    setViewLogout(true)
                    setViewRendu(true)
                } else {
                    setViewRendu(true)
                    setUser(isAuthenticated);
                }
            } catch (error) {
                setViewLogout(false)
            }
        }
        fetchData();
    }, []);
    console.log(viewForgotPassword + ' viewForgotPassword')
    return (
        viewRendu && (
            <>
                <MainTitle animationUsername={animationUsername} content='Welcome' user={user} animation='animate__animated' />
                <HomeDescription animation="animate__animated animate__fadeInUp" />
                {errorMessage && <div className="error-message">{errorMessage}</div>}

                <div className={`flex flex-col mt-10 space-y-6 animate__animated animate__fadeInUp`}>
                    {!viewLogout ? (
                        <>
                            <BtnPrimary content='Create Account' onClick={initRegister} className={`animate__animated ${animationBtnAuth}`} />
                            <BtnTransparent content='Login' onClick={initLogin} className={`animate__animated ${animationBtnAuth}`} />
                        </>
                    ) : <BtnPrimary content='Logout' onClick={initLogout} className={`animate__animated ${animationBtnLogout}`} />}

                </div>
                {viewRegister && <RegisterForm status={viewRegister} initRegister={initRegister} initLogin={initLogin} />}
                {viewLogin && <LoginForm status={viewLogin} initLogin={initLogin} initRegister={initRegister} setviewForgotPassword={setviewForgotPassword} />}
                {viewForgotPassword && <ForgotPassword status={viewForgotPassword} initForgotPassword={initForgotPassword} />}
            </>
        )
    )
}

export default Home
