import React from 'react'
import IconSVG from './IconSVG'
import MainTitle from '../Title/MainTitle'
import HomeDescription from '../Content/HomeDescription'
import BtnPrimary from '../Button/BtnPrimary'
import BtnTransparent from '../Button/BtnTransparent'

const Home = () => {
    return (
        <div className=''>
            <IconSVG />
            <MainTitle content='Welcome' />
            <HomeDescription />

            <div className='flex flex-col mt-10 space-y-6'>
                <BtnPrimary content='Create Account' />
                <BtnTransparent content='Login' />
            </div>

        </div>
    )
}

export default Home
