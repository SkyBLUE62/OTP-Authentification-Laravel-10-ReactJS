import React, { useState, useEffect } from 'react'

const BtnForm = ({ animation, content }) => {

    return (
        <button
            type='submit'
            className={` ${animation} animate__animated bg-secondary text-primary font-montserrat text-xl mx-auto font-semibold h-16 w-80 rounded-2xl shadow-2xl`}>
            {content}
        </button>
    );
}

export default BtnForm
