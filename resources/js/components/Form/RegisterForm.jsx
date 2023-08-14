import React from 'react'
import { AiOutlineCloseCircle, AiOutlineEye } from 'react-icons/ai'
import BtnForm from '../Button/BtnForm'
import RegisterInput from './Input/RegisterInput'

const RegisterForm = () => {
    return (
        <div className='bg-card absolute rounded-t-3xl h-160 md:max-w-2xl z-50 bottom-0 left-0 right-0 mx-auto max-w-[100vw]'>
            <div className='flex flex-col space-y-6 items-center font-montserrat text-secondary'>
                <div className='flex flex-col min-w-[90%]'>
                    <span className='items-start self-start mt-5 text-lg'>Hello...</span>
                    <div className='flex flex-row min-w-full justify-between'>
                        <h1 className='text-3xl font-bold'>Register</h1>
                        <AiOutlineCloseCircle className='text-danger text-3xl' />
                    </div>
                </div>

                <form action="">
                    <div className='flex flex-col space-y-5'>
                        <RegisterInput label='Username' name="username" type="text" />
                        <RegisterInput label='Email' name="email" type="email" />
                        <RegisterInput label='Password' name="password" type="password" />
                        <RegisterInput label='Confim Password' name="confirmpass" type="password" />
                        <BtnForm />
                    </div>

                </form>
                <span className='text-base'> Already have account? <button className='text-danger font-semibolt'>Login</button> </span>
            </div>
        </div>
    )
}

export default RegisterForm
