import React from 'react'

const HomeDescription = ({ animation = null }) => {
    return (
        <p className={`text-font ${animation} text-center font-montserrat font-light text-xl flex items-center justify-center px-16 mt-5`}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        </p>
    )
}

export default HomeDescription
