import React, { useState } from 'react'
import IconSVG from './IconSVG'
import MainTitle from '../Title/MainTitle'
import HomeDescription from '../Content/HomeDescription'
import BtnPrimary from '../Button/BtnPrimary'
import BtnTransparent from '../Button/BtnTransparent'
import RegisterForm from '../Form/RegisterForm';
import 'animate.css/animate.min.css';

const Home = () => {
    const [viewRegister, setViewRegister] = useState(false);

    const initRegister = () => {
        setViewRegister(!viewRegister)
    }

    return (
        <>
            <IconSVG />
            <MainTitle content='Welcome' />
            <HomeDescription />

            <div className='flex flex-col mt-10 space-y-6'>
                <BtnPrimary content='Create Account' onClick={initRegister} />
                <BtnTransparent content='Login' />
            </div>
            {
                <RegisterForm status={viewRegister} initRegister={initRegister} />
            }

        </>
    )
}

export default Home
