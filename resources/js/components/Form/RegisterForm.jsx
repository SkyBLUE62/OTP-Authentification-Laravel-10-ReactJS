import React, { useEffect, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import BtnForm from '../Button/BtnForm';
import RegisterInput from './Input/RegisterInput';
import { useForm } from "react-hook-form"

const RegisterForm = ({ initRegister, status }) => {
    const [view, setView] = useState(false);
    const [animation, setAnimation] = useState('');
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

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

    function onSubmit(data) {
        console.log(data)
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

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='flex flex-col space-y-5'>
                                <RegisterInput label='Username' id='username' name='username' type='text' register={register} errors={errors} />
                                <RegisterInput label='Email' id='email' name='email' type='email' register={register} errors={errors} />
                                <RegisterInput label='Password' id='password' name='password' type='password' register={register} errors={errors} />
                                <RegisterInput label='Confirm Password' id='confirmpass' name='confirmpass' type='password' register={register} errors={errors} />
                                <BtnForm type='submit'>Submit</BtnForm>
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