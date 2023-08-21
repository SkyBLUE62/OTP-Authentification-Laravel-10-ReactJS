import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TimerButton from '../Button/TimerButton';
import axios from 'axios';
import { useForm } from "react-hook-form"
import FormSuccess from '../../assets/video/FormSuccess.gif'

const PhoneValidation = () => {
    const navigate = useNavigate();
    const { token } = useParams();

    const numInputs = 6;
    const inputRefs = Array.from({ length: numInputs }, () => useRef(null));
    const [countdown, setCountdown] = useState(120);
    const [AnimationCard, setAnimationCard] = useState('animate__bounceInLeft');
    const [AnimationBtn, setAnimationBtn] = useState('animate__zoomInDown animate__delay-1s');
    const [btnRendu, setBtnRendu] = useState(true);
    const [renduView, setRenduView] = useState(false);
    const [inputValues, setInputValues] = useState(['', '', '', '', '', '']);
    const [phone, setPhone] = useState('');
    const [code, setCode] = useState('');
    const [AnimationInput, setAnimationInput] = useState('');
    const [isTimerRunning, setIsTimerRunning] = useState(false); // Ajout de l'état pour le timer

    const handleInputChange = (event, index) => {
        const newValue = event.target.value.slice(0, 1);
        const newInputValues = [...inputValues];
        newInputValues[index] = newValue;
        setInputValues(newInputValues);

        if (newValue && index < numInputs - 1) {
            inputRefs[index + 1].current.focus();
        }
    };

    const handleInputKeyDown = (event, index) => {
        if (event.key === 'Backspace' && !inputValues[index] && index > 0) {
            inputRefs[index - 1].current.focus();
        }
    };

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        try {
            const response = await axios.post('/api/verify_token', { token });
            if (response.status === 401) {
                navigate('/', "User not Found, Please try to register again ");
            } else if (response.status === 200) {
                setRenduView(true);
                try {
                    const response = await axios.get('/api/dataUser');
                    if (response.status === 200) {
                        const user = response.data.user;
                        setPhone(user.phone);
                    } else {
                        navigate('/', "User not Found, Please try to register again ");
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        } catch (error) {
            console.log(error);
            navigate('/', "User not Found, Please try to register again ");
        }
    };

    const sendSMS = async () => {
        try {
            const sendSMS = await axios.get('/api/sendSMS');
            if (sendSMS.status === 200) {
                setCode(sendSMS.data.code);
                console.log(sendSMS.data.code)
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const code = inputValues.join('');

        try {
            const response = await axios.post('/api/verify_code', { code }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                if (response.data.token !== null) {
                    navigate('/reset-password/' + response.data.token);
                    return;
                }
                console.log(response)
                localStorage.setItem('authToken', response.data.access_token);

                setAnimationBtn('animate__bounceOutRight');
                setTimeout(() => {
                    setBtnRendu(false);

                    setTimeout(() => {
                        navigate('/');
                    }, 1000);
                }, 1000);

            } else {
                console.log('Statut de réponse non géré:', response.status);
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setInputValues(['', '', '', '', '', '']);
                setAnimationInput('animate__shakeX');
                setTimeout(() => {
                    setAnimationInput('');
                }, 1000);
            } else {
                console.error('Erreur lors de la requête:', error);
            }
        }

    };

    const handleTimerButtonClick = () => {
        if (!isTimerRunning) {
            sendSMS();
            setIsTimerRunning(true);
        }
    };

    return (
        renduView && (
            <div className={`flex animate__animated overflow-hidden ${AnimationCard} flex-col mx-auto justify-center items-center font-montserrat mt-5`}>
                <div className='bg-card w-80 h-64 rounded-3xl flex flex-col overflow-hidden'>
                    <div className='flex flex-col items-center justify-center'>
                        <h1 className='mt-2 text-lg text-secondary font-semibold '>Enter the OTP sent to </h1>
                        <span>{phone}</span>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className={`flex flex-row justify-around mt-5 animate__animated ${AnimationInput}`}>
                            {inputValues.map((value, index) => (
                                <div key={index} className={`bg-[#F6F6F6] box-shadow-inset-2  h-10 w-10 rounded-xl overflow-hidden`}>
                                    <input
                                        ref={inputRefs[index]}
                                        className='text-center appearance-none w-full h-full outline-none bg-transparent'
                                        type="text"
                                        value={value}
                                        onChange={(event) => handleInputChange(event, index)}
                                        onKeyDown={(event) => handleInputKeyDown(event, index)}
                                        required
                                    />
                                </div>
                            ))}
                        </div>
                        <div className='flex flex-col items-center justify-center mt-5'>
                            <span className='font-semibold text-sm flex justify-center'>{countdown} sec</span>
                            <span className='flex flex-row space-y-2 items-center'> Don’t receive code ?
                                <TimerButton
                                    countdown={countdown}
                                    setCountdown={setCountdown}
                                    sendSMS={handleTimerButtonClick}
                                    isTimerRunning={isTimerRunning}
                                />
                            </span>
                        </div>
                        {btnRendu && <button type="submit" className={`bg-secondary animate__animated ${AnimationBtn} mt-5 items-center justify-center flex text-primary font-montserrat text-lg mx-auto font-semibold h-10 w-40 rounded-2xl shadow-2xl`}>
                            Submit
                        </button>}
                        {!btnRendu && (
                            <div className="flex justify-center items-center">
                                <img
                                    src={FormSuccess}
                                    alt=""
                                    className="h-16 w-16 animate__animated animate__rollIn"
                                />
                            </div>
                        )}
                    </form>
                </div>
            </div>
        )
    );
};

export default PhoneValidation;
