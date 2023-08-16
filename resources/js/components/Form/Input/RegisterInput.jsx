import React, { useRef } from 'react';
import { AiOutlineEye, AiOutlineLock, AiOutlineMail } from 'react-icons/ai';
import { BsPhone } from 'react-icons/bs';

const RegisterInput = ({ label, name, type, register, errors, watch, onChange = undefined, ...props }) => {

    let validationRules = {};
    const inputRef = useRef(null);
    const watchPassword = watch('password', '');
    switch (name) {
        case 'username':
            validationRules = {
                required: `The field ${label} is required.`,
            };
            break;
        case 'email':
            validationRules = {
                required: `The field ${label} is required.`,
            };
            break;
        case 'phone':
            validationRules = {
                required: `The field ${label} is required.`,
                pattern: {
                    value: /^\+\d+$/,
                    message: 'Please enter a valid international telephone number.',
                },
            };
            break;
        case 'password':
            validationRules = {
                required: `The field ${label} is required.`,
                minLength: {
                    value: 8,
                    message: 'The password must be at least 8 characters long.',
                },
            };
            break;
        case 'confirmpass':
            validationRules = {
                required: 'The Confirmation Password field is required.',
                validate: value =>
                    value === watchPassword || 'The passwords do not match.',
            };
            break;
        default:
            break;
    }

    return (
        <div id={`global_${name}`} className={`flex flex-col border-1.5 rounded-lg border-secondary relative h-14 animate__animated ${props.errorAnimation}`}>
            <label htmlFor={props.id} className='absolute top-0 left-2 transform -translate-y-1/2 bg-card px-1'>
                {label}
            </label>
            <div className='flex relative flex-row w-full h-full '>
                <input
                    onChange={onChange}
                    type={type}
                    {...register(name, validationRules)}
                    className='w-full h-full bg-transparent outline-none ml-3'
                />
                <span className='mx-2 text-xl flex items-center justify-center'>
                    {type === 'text' ? <AiOutlineEye /> : type === 'password' ? <AiOutlineLock /> : type === "email" ? <AiOutlineMail /> : type === "tel" ? <BsPhone /> : null}
                </span>

            </div>
        </div>
    );
};

export default RegisterInput;
