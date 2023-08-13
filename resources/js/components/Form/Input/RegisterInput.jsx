import React from 'react'
import { AiOutlineEye, AiOutlineLock, AiOutlineMail } from 'react-icons/ai'

const RegisterInput = ({ label, ...props }) => {
    return (
        <div className='flex flex-col border-1.5 rounded-lg border-secondary relative h-14'>
            <label htmlFor="" className='absolute top-0 left-2 transform -translate-y-1/2 bg-card px-1'>
                {label}
            </label>
            <div className='flex relative flex-row w-full h-full'>
                <input {...props} className='w-full h-full bg-transparent outline-none ml-3' />
                <button className='mx-2 text-xl'>
                    {props.type == 'text' ? <AiOutlineEye /> : props.type == 'password' ? <AiOutlineLock /> : props.type === "email" ? <AiOutlineMail /> : null}
                </button>
            </div>
        </div>
    )
}

export default RegisterInput
