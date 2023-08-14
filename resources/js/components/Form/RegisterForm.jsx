import React, { useEffect, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import BtnForm from '../Button/BtnForm';
import RegisterInput from './Input/RegisterInput';

const RegisterForm = ({ initRegister, status }) => {
    const [view, setView] = useState(false);
    const [animation, setAnimation] = useState('');

    useEffect(() => {
        if (status === true) {
            setView(true);
            setAnimation('animate__animated animate__backInUp');
            document.body.style.overflow = 'hidden';
        }
    }, [status]);

    const handleClose = () => {
        setAnimation('animate__animated animate__backOutDown');
        setTimeout(() => {
            setView(false);
            initRegister();
            document.body.style.overflow = 'auto';
        }, 500);
    }
    
    return (
        <>
            {view && (
                <div className={`bg-card ${animation} absolute rounded-t-3xl h-160 md:max-w-2xl z-50 bottom-0 left-0 right-0 mx-auto`}>
                    <div className='flex flex-col space-y-6 items-center font-montserrat text-secondary'>
                        <div className='flex flex-col min-w-[90%]'>
                            <span className='items-start self-start mt-5 text-lg'>Hello...</span>
                            <div className='flex flex-row min-w-full justify-between mb-6'>
                                <h1 className='text-3xl font-bold'>Register</h1>
                                <AiOutlineCloseCircle onClick={handleClose} className='text-danger text-3xl cursor-pointer' />
                            </div>
                        </div>

                        <form>
                            <div className='flex flex-col space-y-5'>
                                <RegisterInput label='Username' name='username' type='text' />
                                <RegisterInput label='Email' name='email' type='email' />
                                <RegisterInput label='Password' name='password' type='password' />
                                <RegisterInput label='Confirm Password' name='confirmpass' type='password' />
                                <BtnForm />
                            </div>
                        </form>

                        <span className='text-base'>
                            Already have an account? <button className='text-danger font-semibold'>Login</button>
                        </span>
                    </div>
                </div>

            )}
        </>
    );
};

export default RegisterForm;