import React, { useState, useEffect } from 'react';

const TimerButton = ({ countdown, setCountdown, sendSMS }) => {
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const startCountdown = () => {
        setCountdown(60); // Réinitialisation du compteur à 5 secondes
        setButtonDisabled(true); // Désactivation du bouton
        sendSMS();
    };

    useEffect(() => {
        if (countdown > 0 && buttonDisabled) {
            // Décrémente le compteur toutes les secondes
            const timer = setInterval(() => {
                setCountdown(prevCountdown => prevCountdown - 1);
            }, 1000);

            // Nettoie l'intervalle lorsque le composant est démonté ou lorsque le compteur atteint 0
            return () => {
                clearInterval(timer);
                if (countdown === 0) {
                    setButtonDisabled(false); // Réactive le bouton lorsque le compteur atteint 0
                }
            };
        } else if (countdown === 0) {
            setButtonDisabled(false); // Réactive le bouton lorsque le compteur atteint 0
        }
    }, [countdown, buttonDisabled]);

    // Appel de startCountdown lors du rendu initial
    useEffect(() => {
        startCountdown();
    }, []);

    return (
        <div>
            <button
                onClick={startCountdown}
                disabled={buttonDisabled}
                className={`${buttonDisabled ? 'cursor-not-allowed font-bolt' : ' font-bold'}`}
            >
                {buttonDisabled ? 'Re-send' : 'Re-send'}
            </button>
        </div>
    );
};

export default TimerButton;
