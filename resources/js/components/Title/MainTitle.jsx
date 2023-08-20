import React from 'react'

const MainTitle = ({ content = 'no content', animation = null, user, animationUsername = null }) => {
    return (
        <h1 className={`mt-10 font-montserrat text-4xl font-normal text-title flex items-center justify-center ${animation}`}>
            {content}
            &nbsp;
            <span className={`animate__animated ${animationUsername}`}>{user && user.name}</span>
        </h1>
    )
}

export default MainTitle
