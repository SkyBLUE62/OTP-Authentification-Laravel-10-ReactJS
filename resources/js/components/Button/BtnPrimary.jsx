import React from 'react'

const BtnPrimary = ({ content = 'no content', className, onClick = null }) => {
    return (
        <button onClick={onClick} className={`bg-btnPrimary mx-auto h-16 w-80 rounded-2xl shadow-2xl ${className}`}>
            {content}
        </button>
    )
}

export default BtnPrimary
