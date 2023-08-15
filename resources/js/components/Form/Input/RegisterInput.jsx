import React from 'react';
import { AiOutlineEye, AiOutlineLock, AiOutlineMail } from 'react-icons/ai';

const RegisterInput = ({ label, name, type, register, errors, ...props }) => {
    return (
        <div className='flex flex-col border-1.5 rounded-lg border-secondary relative h-14'>
            <label htmlFor={props.id} className='absolute top-0 left-2 transform -translate-y-1/2 bg-card px-1'>
                {label}
            </label>
            <div className='flex relative flex-row w-full h-full'>
                <input
                    type={type}
                    {...register(name)}
                    className='w-full h-full bg-transparent outline-none ml-3'
                />
                <span className='mx-2 text-xl flex items-center justify-center'>
                    {type === 'text' ? <AiOutlineEye /> : type === 'password' ? <AiOutlineLock /> : type === "email" ? <AiOutlineMail /> : null}
                </span>
            </div>
            {errors[name] && <p>{errors[name].message}</p>}
        </div>
    );
};

export default RegisterInput;