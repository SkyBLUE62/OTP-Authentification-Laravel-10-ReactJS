import React from 'react'

const MainTitle = ({ content = 'no content', animation = null, user }) => {
    return (
        <h1 className={`mt-10 font-montserrat text-4xl font-normal text-title flex items-center justify-center ${animation}`}>
            {content}
            {user && ' ' + user.name}
        </h1>
    )
}

export default MainTitle
