import React, { useState, useEffect } from 'react'
import MainTitle from '../Title/MainTitle'
import HomeDescription from '../Content/HomeDescription'
import BtnPrimary from '../Button/BtnPrimary'
import BtnTransparent from '../Button/BtnTransparent'
import RegisterForm from '../Form/RegisterForm';
import LoginForm from '../Form/LoginForm'
import 'animate.css/animate.min.css';
import { useLocation } from 'react-router-dom';
import AuthCheck from '../utils/AuthCheck'


const Home = () => {
    const [viewRendu, setViewRendu] = useState(false)
    const [viewRegister, setViewRegister] = useState(false);
    const [viewLogin, setViewLogin] = useState(false);
    const [viewLogout, setViewLogout] = useState(false);
    const errorMessage = location.state?.errorMessage;
    const [user, setUser] = useState(false)

    const initRegister = () => {
        setViewRegister(!viewRegister);
    };

    const initLogin = () => {
        setViewLogin(!viewLogin);
    };

    const initLogout = async () => {
        try {
            const response = await axios.get('/api/logout');
            if (response.status === 200) {
                setUser(false)
                setViewLogout(false)
            }
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        async function fetchData() {
            try {
                const isAuthenticated = await AuthCheck();
                console.log(isAuthenticated)
                if (isAuthenticated !== false) {
                    setUser(isAuthenticated);
                    setViewLogout(true)
                    setViewRendu(true)
                } else {
                    setViewRendu(true)
                    setUser(isAuthenticated);
                }
            } catch (error) {
                setViewLogout(false)
            }
        }
        fetchData();
    }, []);

    return (
        viewRendu && (
            <>
                <MainTitle content='Welcome' user={user} animation='animate__animated animate__fadeInUp' />
                <HomeDescription animation="animate__animated animate__fadeInUp" />
                {errorMessage && <div className="error-message">{errorMessage}</div>}

                <div className='flex flex-col mt-10 space-y-6 animate__animated animate__fadeInUp'>
                    {!viewLogout ? (
                        <>
                            <BtnPrimary content='Create Account' onClick={initRegister} />
                            <BtnTransparent content='Login' onClick={initLogin} />
                        </>
                    ) : <BtnPrimary content='Logout' onClick={initLogout} className={'animate__animated animate__fadeInUp'} />}

                </div>
                {viewRegister && <RegisterForm status={viewRegister} initRegister={initRegister} />}
                {viewLogin && <LoginForm status={viewLogin} initLogin={initLogin} />}

            </>
        )
    )
}

export default Home
