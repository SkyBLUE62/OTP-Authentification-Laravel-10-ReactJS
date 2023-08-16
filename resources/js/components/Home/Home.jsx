import React, { useState } from 'react'
import MainTitle from '../Title/MainTitle'
import HomeDescription from '../Content/HomeDescription'
import BtnPrimary from '../Button/BtnPrimary'
import BtnTransparent from '../Button/BtnTransparent'
import RegisterForm from '../Form/RegisterForm';
import LoginForm from '../Form/LoginForm'
import 'animate.css/animate.min.css';
import { useLocation } from 'react-router-dom';



const Home = () => {
    const [viewRegister, setViewRegister] = useState(false);
    const [viewLogin, setViewLogin] = useState(false);
    const location = useLocation();
    const errorMessage = location.state?.errorMessage;

    const initRegister = () => {
        setViewRegister(!viewRegister)
    }
    const initLogin = () => {
        setViewLogin(!viewLogin)
    }

    return (
        <>
            <MainTitle content='Welcome' animation='animate__animated animate__fadeInUp' />
            <HomeDescription animation="animate__animated animate__fadeInUp" />

            {errorMessage && <div className="error-message">{errorMessage}</div>}

            <div className='flex flex-col mt-10 space-y-6 animate__animated animate__fadeInUp'>
                <BtnPrimary content='Create Account' onClick={initRegister} />
                <BtnTransparent content='Login' onClick={initLogin} />
            </div>
            {viewRegister && <RegisterForm status={viewRegister} initRegister={initRegister} />}
            {viewLogin && <LoginForm status={viewLogin} initLogin={initLogin} />}
        </>
    )
}

export default Home
