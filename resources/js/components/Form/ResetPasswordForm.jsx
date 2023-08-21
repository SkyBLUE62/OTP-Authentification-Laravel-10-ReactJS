import React, { useEffect, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import BtnForm from '../Button/BtnForm';
import RegisterInput from './Input/RegisterInput';
import { useForm } from "react-hook-form"
import axios from 'axios';
import FormSuccess from '../../assets/video/FormSuccess.gif'
import { useNavigate, useParams } from 'react-router-dom';


const ResetPasswordForm = () => {
    const [view, setView] = useState(false);
    const [animation, setAnimation] = useState('');
    const [msgError, setMsgError] = useState('')
    const navigate = useNavigate();
    const [animationInput, setAnimationInput] = useState('')
    const [successForm, setSuccessForm] = useState(false);
    const [btnFormAnimation, setBtnFormAnimation] = useState('animate__zoomInDown animate__delay-1s')
    const [btnView, setBtnView] = useState(true)
    const { token } = useParams();

    const {
        register,
        handleSubmit,
        watch,
        clearErrors,
        reset,
        formState,
        formState: { errors, isSubmitSuccessful },

    } = useForm()

    useEffect(() => {
        checkUser()
    }, [token])

    const handleClose = () => {
        setAnimation('animate__backOutDown');
        setTimeout(() => {
            navigate('/')
            setView(false);
            document.body.style.overflow = 'auto';
        }, 500);
    }


    const checkUser = async () => {

        try {
            const response = await axios.post('/api/verify_token', { token });
            if (response.status == 200) {
                setView(true)
            }
        } catch (error) {
            navigate('/');
        }
    }

    const onSubmit = async (data) => {
        console.log(data)
        try {
            const response = await axios.post('/api/reset-password', data)
            if (response.status === 200) {
                setBtnFormAnimation('animate__zoomOutRight')
                setSuccessForm(true);
                setTimeout(() => {
                    setBtnView(false)
                    setTimeout(() => {
                        navigate('/')
                    })
                }, 1000);
            }
        } catch (error) {
            if (error.response.status === 401) {
                console.log('password not change')
                setMsgError('Passwords do not match')
            }
            if (error.response.status === 404) {
                console.log('User not Found')
                setMsgError('User not found')
            }
        }
    }

    return (
        <>
            {view == true ?
                <div className={`bg-card absolute ${animation} animate__animated rounded-t-3xl h-112 md:max-w-2xl z-50 bottom-0 md:bottom-40 md:rounded-3xl left-0 right-0 mx-auto`}>
                    <div className='flex flex-col space-y-6 items-center font-montserrat text-secondary'>
                        <div className='flex flex-col min-w-[90%]'>
                            <span className='items-start self-start mt-5 text-lg'>Forgot Password ?</span>
                            <div className='flex flex-row min-w-full justify-between mb-6'>
                                <h1 className='text-3xl font-bold'>Reset Password</h1>
                                <AiOutlineCloseCircle onClick={handleClose} className='text-danger text-3xl cursor-pointer' />
                            </div>
                            {errors.password && <span className='text-xs text-danger '>{errors.password.message}</span>}
                            {errors.confirmpass && <span className='text-xs text-danger '>{errors.confirmpass.message}</span>}

                            {msgError != '' && <span className='text-xs text-danger '>{msgError}</span>}
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='flex flex-col space-y-5 w-80'>
                                <div className={`flex flex-col space-y-5 animate__animated ${animationInput}`}>
                                    <RegisterInput label='Password' id='password' name='password' type='password' register={register} errors={errors} watch={watch} />
                                    <RegisterInput label='Confirm Password' id='confirmpass' name='confirmpass' type='password' register={register} errors={errors} watch={watch} />
                                </div>
                                {btnView && <BtnForm content="Reset Password" animation={btnFormAnimation} />}
                                {successForm && (
                                    <div className='flex items-center justify-center'>
                                        <img src={FormSuccess} alt="" className='h-16 w-16 animate__animated animate__rollIn' />
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
                : null}
        </>
    )
}

export default ResetPasswordForm
