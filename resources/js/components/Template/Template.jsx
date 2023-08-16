import React from 'react'
import IconSVG from '../Home/IconSVG'
import Footer from '../Footer/Footer'
const Template = ({ children }) => {
    return (
        <div className='bg-primary h-screen w-screen shadow-xl'>
            <IconSVG />
            {children}
            <Footer />
        </div>
    )
}

export default Template
