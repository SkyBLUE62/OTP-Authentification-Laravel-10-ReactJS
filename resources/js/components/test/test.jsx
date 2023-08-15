import React, { useState, useEffect } from 'react';
import { PhoneNumberUtil } from 'google-libphonenumber';

const test = () => {

    const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('');
    const phoneUtil = PhoneNumberUtil.getInstance();
    const number = phoneUtil.parseAndKeepRawInput('202-456-1414', 'US');
    console.log('Code de pays :', number.getCountryCode());
    useEffect(() => {
        // Obtenir la localisation du client en utilisant l'API de géolocalisation du navigateur
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;

                // Utilisez latitude et longitude pour déterminer le code de pays
                const clientLocation = determineClientLocation(latitude, longitude);

                // Exemple: clientLocation = 'US' pour les États-Unis
                const number = phoneUtil.parseAndKeepRawInput('202-456-1414', clientLocation);
                const formattedNumber = phoneUtil.format(number, PhoneNumberUtil.Format.INTERNATIONAL);
                setFormattedPhoneNumber(formattedNumber);
            },
            (error) => {
                console.error('Erreur de géolocalisation :', error);
            }
        );
    }, []);
    return (
        <div className='bg-red-500'>
            trhrtgergergergergrer
        </div>
    )
}

export default test
