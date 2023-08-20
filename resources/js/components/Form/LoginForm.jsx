import React, { useEffect, useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai';
import BtnForm from '../Button/BtnForm';
import RegisterInput from './Input/RegisterInput';
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import FormSuccess from '../../assets/video/FormSuccess.gif'

const LoginForm = ({ status, initLogin, initRegister }) => {
    const [view, setView] = useState(false);
    const [animation, setAnimation] = useState('');
    const [msgError, setMsgError] = useState('')
    const navigate = useNavigate();
    const [animationInput, setAnimationInput] = useState('')
    const [successForm, setSuccessForm] = useState(false);
    const [btnFormAnimation, setBtnFormAnimation] = useState('animate__zoomInDown animate__delay-1s')
    const [btnView, setBtnView] = useState(true)
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
        if (status === true) {
            console.log('true')
            setView(true);
            setAnimation('animate__backInUp');
            document.body.style.overflow = 'hidden';
        }
    }, [status]);

    const handleClose = () => {
        setAnimation('animate__backOutDown');
        setTimeout(() => {
            setView(false);
            initLogin();
            document.body.style.overflow = 'auto';
        }, 500);
    }
    const onSubmit = async (data) => {
        console.log(data)
        try {
            const response = await axios.post('/api/verify_user', data)
            if (response.status === 200 && response.data.token != 'null') {
                setBtnFormAnimation('animate__zoomOutRight')
                console.log(response.data.token)
                setTimeout(() => {
                    setBtnView(false)
                    setSuccessForm(true);
                }, 1000);
                console.log(response.data.token)
                setTimeout(() => {
                    const token = response.data.token
                    navigate(`/phone-validation/${token}`);
                }, 2000);
            }

        } catch (error) {
            setMsgError('Incorrect username or password')
            reset({ password: '' });
            setAnimationInput('animate__shakeX');
            setTimeout(() => {
                setAnimationInput('');
            }, 1000);
        }
    }
    const handleChangeForm = () => {
        setAnimation('animate__backOutDown');
        setTimeout(() => {
            setTimeout(() => {
                initLogin();
            }, 1000);
            initRegister();
        }, 1000);
    }
    
    return (
        <>
            {view == true ?
                <div className={`bg-card absolute ${animation} animate__animated rounded-t-3xl h-128 md:max-w-2xl z-50 bottom-0 md:bottom-40 md:rounded-3xl left-0 right-0 mx-auto`}>
                    <div className='flex flex-col space-y-6 items-center font-montserrat text-secondary'>
                        <div className='flex flex-col min-w-[90%]'>
                            <span className='items-start self-start mt-5 text-lg'>Welcome Back !</span>
                            <div className='flex flex-row min-w-full justify-between mb-6'>
                                <h1 className='text-3xl font-bold'>Login</h1>
                                <AiOutlineCloseCircle onClick={handleClose} className='text-danger text-3xl cursor-pointer' />
                            </div>
                            {errors.username && <span className='text-xs text-danger '>{errors.username.message}</span>}
                            {errors.password && <span className='text-xs text-danger '>{errors.password.message}</span>}
                            {msgError != '' && <span className='text-xs text-danger '>{msgError}</span>}
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='flex flex-col space-y-5 w-80'>
                                <div className={`flex flex-col space-y-5 animate__animated ${animationInput}`}>
                                    <RegisterInput label='Username' id='username' name='username' type='text' register={register} errors={errors} watch={watch} />
                                    <RegisterInput label='Password' id='password' name='password' type='password' register={register} errors={errors} watch={watch} />
                                </div>

                                <div className='flex flex-row justify-between items-center'>
                                    <div className='flex flex-row items-center justify-center space-x-2'>
                                        <input type="checkbox" name="remember" {...register('remember')} className='h-4 w-4' />
                                        <label htmlFor="" className='text-xs'>Remember me</label>
                                    </div>
                                    <button className='text-xs'>Forgot Password ?</button>
                                </div>
                                {btnView && <BtnForm content="Login" animation={btnFormAnimation} />}
                                {successForm && (
                                    <div className='flex items-center justify-center'>
                                        <img src={FormSuccess} alt="" className='h-16 w-16 animate__animated animate__rollIn' />
                                    </div>
                                )}
                            </div>
                        </form>

                        <span className='text-base'>
                            Don’t have an account? <button className='text-danger font-semibold' onClick={handleChangeForm}>Register</button>
                        </span>
                    </div>
                </div>
                : null}
        </>
    )
}

export default LoginForm
