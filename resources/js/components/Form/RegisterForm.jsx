import React, { useEffect, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import BtnForm from '../Button/BtnForm';
import RegisterInput from './Input/RegisterInput';
import { useForm } from "react-hook-form"
import axios from 'axios';
import FormSuccess from '../../assets/video/FormSuccess.gif'
import { useNavigate } from 'react-router-dom';

const RegisterForm = ({ initRegister, status }) => {

    const {
        register,
        handleSubmit,
        watch,
        clearErrors,
        reset,
        formState,
        formState: { errors, isSubmitSuccessful },

    } = useForm()
    const [view, setView] = useState(false);
    const [animation, setAnimation] = useState('');
    const [fieldAnimations, setFieldAnimations] = useState({
        username: errors.username ? 'animate__shakeX' : '',
        email: errors.email ? 'animate__shakeX' : '',
        phone: errors.phone ? 'animate__shakeX' : '',
        password: errors.password ? 'animate__shakeX' : '',
        confirmpass: errors.confirmpass ? 'animate__shakeX' : '',
    })

    const [btnFormView, setBtnFormView] = useState(true);
    const [successForm, setSuccessForm] = useState(false);
    const [btnFormAnimation, setBtnFormAnimation] = useState('animate__zoomInDown animate__delay-1s')
    const [msgError, setMsgError] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        setFieldAnimations(prevFieldAnimations => ({
            ...prevFieldAnimations,
            username: errors.username ? 'animate__shakeX' : '',
            email: errors.email ? 'animate__shakeX' : '',
            phone: errors.phone ? 'animate__shakeX' : '',
            password: errors.password ? 'animate__shakeX' : '',
            confirmpass: errors.confirmpass ? 'animate__shakeX' : '',
        }));
    }, [errors]);

    useEffect(() => {
        if (status === true) {
            setView(true);
            setAnimation('animate__animated animate__backInUp');
            document.body.style.overflow = 'hidden';
        }
    }, [status])

    const handleClose = () => {
        setAnimation('animate__animated animate__backOutDown');

        setTimeout(() => {
            setView(false);
            initRegister();
            document.body.style.overflow = 'auto';
        }, 500);
    }

    async function onSubmit(data) {
        console.log(data);

        try {
            const response = await axios.post('api/setDataUser', data);
            console.log('Response:', response);

            if (response.status === 200) {
                const { user, token } = response.data;

                // Animate the form button out
                setBtnFormAnimation('animate__zoomOutRight');

                // Hide the form button and show success message
                setTimeout(() => {
                    setBtnFormView(false);
                    setSuccessForm(true);
                }, 500);

                console.log(token);

                // Redirect to phone validation page after a delay
                setTimeout(() => {
                    navigate(`/phone-validation/${token}`);
                }, 1000);
            }
        } catch (error) {
            if (error.response && error.response.status === 422) {
                const { inputError, msgError } = error.response.data;

                console.log(inputError);

                if (inputError) {
                    setMsgError(msgError);
                    console.log(msgError);
                }
            } else {
                console.log(error);
            }
        }
    }


    return (
        <>
            {view && (
                <div className={`bg-card ${animation} absolute rounded-t-3xl h-160  md:max-w-2xl z-50 bottom-0 left-0 right-0 mx-auto md:bottom-40 md:rounded-3xl`}>
                    <div className='flex flex-col space-y-6 items-center font-montserrat text-secondary'>
                        <div className='flex flex-col min-w-[90%]'>
                            <span className='items-start self-start mt-5 text-lg'>Hello...</span>
                            <div className='flex flex-row min-w-full justify-between'>
                                <h1 className='text-3xl font-bold'>Register</h1>
                                <AiOutlineCloseCircle onClick={handleClose} className='text-danger text-3xl cursor-pointer' />
                            </div>
                            {errors.username && <span className='text-xs text-danger '>{errors.username.message}</span>}
                            {errors.email && <span className='text-xs text-danger '>{errors.email.message}</span>}
                            {errors.phone && <span className='text-xs text-danger '>{errors.phone.message}</span>}
                            {errors.password && <span className='text-xs text-danger '>{errors.password.message}</span>}
                            {errors.confirmpass && <span className='text-xs text-danger '>{errors.confirmpass.message}</span>}
                            {msgError !== '' && <span className='text-xs text-danger '>{msgError}</span>}
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='flex flex-col space-y-5 w-80'>
                                <RegisterInput errorAnimation={fieldAnimations.username} label='Username' id='username' name='username' type='text' register={register} errors={errors} watch={watch} />
                                <RegisterInput errorAnimation={fieldAnimations.email} label='Email' id='email' name='email' type='email' register={register} errors={errors} watch={watch} />
                                <RegisterInput errorAnimation={fieldAnimations.phone} label='Phone' id='phone' name='phone' type='tel' register={register} errors={errors} watch={watch} />
                                <RegisterInput errorAnimation={fieldAnimations.password} label='Password' id='password' name='password' type='password' register={register} errors={errors} watch={watch} />
                                <RegisterInput errorAnimation={fieldAnimations.confirmpass} label='Confirm Password' id='confirmpass' name='confirmpass' type='password' register={register} errors={errors} watch={watch} />

                                <div className={`flex items-center justify-center`}>
                                    {btnFormView && <BtnForm content='Register' animation={btnFormAnimation} />}
                                    {successForm && <img src={FormSuccess} alt="" className='h-16 w-16 animate__animated animate__rollIn' />}
                                </div>
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