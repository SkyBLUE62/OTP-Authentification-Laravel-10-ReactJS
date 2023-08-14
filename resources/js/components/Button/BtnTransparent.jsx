import React from 'react'

const BtnTransparent = ({ content = 'no content', className, onClick = null }) => {
    return (
        <button onClick={onClick} className={`bg-transparent border-4 text-font  border-primary mx-auto h-16 w-80  rounded-2xl shadow-2xl ${className}`}>
            {content}
        </button>
    )
}

export default BtnTransparent
