import React, { useState } from 'react';
import Home from './Home/Home';
import PhoneValidation from './OtpValidation/PhoneValidation';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Template from './Template/Template';
import ResetPasswordForm from './Form/ResetPasswordForm';
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Template><Home /></Template>} />
                <Route path="/phone-validation/:token" element={<Template><PhoneValidation /></Template>} />
                <Route path="/reset-password/:token" element={<Template><ResetPasswordForm /></Template>} />
            </Routes>
        </Router>
    );
}

export default App;
