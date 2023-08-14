import React, { useState } from 'react'
import IconSVG from './IconSVG'
import MainTitle from '../Title/MainTitle'
import HomeDescription from '../Content/HomeDescription'
import BtnPrimary from '../Button/BtnPrimary'
import BtnTransparent from '../Button/BtnTransparent'
import RegisterForm from '../Form/RegisterForm';
import LoginForm from '../Form/LoginForm'
import 'animate.css/animate.min.css';

const Home = () => {
    const [viewRegister, setViewRegister] = useState(false);

    const initRegister = () => {
        setViewRegister(!viewRegister)
    }

    return (
        <>
            <IconSVG />
            <MainTitle content='Welcome' animation='animate__animated animate__fadeInUp' />
            <HomeDescription animation="animate__animated animate__fadeInUp" />

            <div className='flex flex-col mt-10 space-y-6 animate__animated animate__fadeInUp'>
                <BtnPrimary content='Create Account' onClick={initRegister} />
                <BtnTransparent content='Login' />
            </div>
            {<RegisterForm status={viewRegister} initRegister={initRegister} />}
            <LoginForm />

        </>
    )
}

export default Home
