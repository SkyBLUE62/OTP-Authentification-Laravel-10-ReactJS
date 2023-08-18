import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TimerButton from '../Button/TimerButton';
import axios from 'axios';
import { useForm } from "react-hook-form"

const PhoneValidation = () => {
    // Récupère le paramètre "token" depuis l'URL
    const { token } = useParams();
    const navigate = useNavigate();
    const numInputs = 6; // Nombre d'inputs
    const inputRefs = Array.from({ length: numInputs }, () => useRef(null));
    const [countdown, setCountdown] = useState(120); // Initialisation à 120 secondes
    const {
        register,
        handleSubmit,
        watch,
        clearErrors,
        reset,
        formState,
        formState: { errors, isSubmitSuccessful },

    } = useForm()

    const [inputValues, setInputValues] = useState(['', '', '', '', '', '']);
    const [phone, setPhone] = useState('')
    const [code, setCode] = useState('')

    const handleInputChange = (event, index) => {
        const newValue = event.target.value.slice(0, 1);
        const newInputValues = [...inputValues];
        newInputValues[index] = newValue;
        setInputValues(newInputValues);

        if (newValue && index < numInputs - 1) {
            inputRefs[index + 1].current.focus(); // Déplace le focus vers l'input suivant
        }
    };

    const handleInputKeyDown = (event, index) => {
        if (event.key === 'Backspace' && !inputValues[index] && index > 0) {
            inputRefs[index - 1].current.focus(); // Déplace le focus vers l'input précédent
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/dataUser');
                if (response.status == 200) {
                    const user = response.data.user;
                    console.log(response);
                    setPhone(user.phone);
                    try {
                        sendSMS()
                    } catch (error) {
                        console.log(error)
                    }
                } else {
                    navigate('/', "User not Found, Please try to register again ")
                }

            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, []);


    const sendSMS = async () => {
        const sendSMS = await axios.get('/api/sendSMS');
        setCode(sendSMS.data.code);
    }

    const onSubmit = async () => {
        const code = inputValues.join('');

        try {
            const response = await axios.post('/api/verify_code', { code }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                console.log('Compte créé');
                localStorage.setItem('authToken', response.data.access_token);
            } else {
                console.log('Code incorrect');
            }
        } catch (error) {
            console.error('Erreur lors de la requête:', error);
        }
    };



    return (
        <div className='flex flex-col mx-auto justify-center items-center font-montserrat mt-5'>
            <div className='bg-card w-80 h-64 rounded-3xl flex flex-col'>
                <div className='flex flex-col items-center justify-center'>
                    <h1 className='mt-2 text-lg text-secondary font-semibold '>Enter the OTP sent to </h1>
                    <span>{phone}</span>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-row justify-around mt-5'>
                        {inputValues.map((value, index) => (
                            <div key={index} className='bg-[#F6F6F6] box-shadow-inset-2 h-10 w-10 rounded-xl overflow-hidden'>
                                <input
                                    ref={inputRefs[index]}
                                    className='text-center appearance-none w-full h-full outline-none bg-transparent'
                                    type="text"
                                    value={value}
                                    onChange={(event) => handleInputChange(event, index)}
                                    onKeyDown={(event) => handleInputKeyDown(event, index)}
                                />
                            </div>
                        ))}
                    </div>
                    <div className='flex flex-col items-center justify-center mt-5'>
                        <span className='font-semibold text-sm flex justify-center'>{countdown} sec</span>
                        <span className='flex flex-row space-y-2 items-center'> Don’t receive code ?&nbsp;  <TimerButton countdown={countdown} setCountdown={setCountdown} sendSMS={sendSMS} /></span>
                    </div>
                    {code != '' ? <span>Code : {code}</span> : null}
                    <button type="submit" className='bg-secondary mt-5 items-center justify-center flex text-primary font-montserrat text-lg mx-auto font-semibold h-10 w-40 rounded-2xl shadow-2xl'>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PhoneValidation;
