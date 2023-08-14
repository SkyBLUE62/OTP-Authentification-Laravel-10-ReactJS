import React, { useEffect, useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai';
import BtnForm from '../Button/BtnForm';
import RegisterInput from './Input/RegisterInput';

const LoginForm = () => {
    return (
        <div className={`bg-card absolute rounded-t-3xl h-128 md:max-w-2xl z-50 bottom-0 left-0 right-0 mx-auto`}>
            <div className='flex flex-col space-y-6 items-center font-montserrat text-secondary'>
                <div className='flex flex-col min-w-[90%]'>
                    <span className='items-start self-start mt-5 text-lg'>Welcome Back !</span>
                    <div className='flex flex-row min-w-full justify-between mb-6'>
                        <h1 className='text-3xl font-bold'>Login</h1>
                        <AiOutlineCloseCircle className='text-danger text-3xl cursor-pointer' />
                    </div>
                </div>

                <form>
                    <div className='flex flex-col space-y-5'>
                        <RegisterInput label='Email' name='email' type='email' />
                        <RegisterInput label='Password' name='password' type='password' />
                        <div className='flex flex-row justify-between items-center'>
                            <div className='flex flex-row items-center justify-center space-x-2'>
                                <input type="checkbox" name="remember" className='h-4 w-4' />
                                <label htmlFor="" className='text-xs'>Remember me</label>
                            </div>
                            <button className='text-xs'>Forgot Password ?</button>
                        </div>
                        <BtnForm />
                    </div>
                </form>

                <span className='text-base'>
                    Don’t have an account? <button className='text-danger font-semibold'>Register</button>
                </span>
            </div>
        </div>
    )
}

export default LoginForm
