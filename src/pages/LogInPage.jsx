import React from 'react';
const LogIn = () => {

    return (
        <div className="register">
            <h2 className="register__header">Вход</h2>

            <div className="register__field">
                <input type="text" placeholder="Логин"/>
            </div>
            <div className="register__field">
                <input type="text" placeholder="Пароль"/>
            </div>

            <p className="register__terms">protected by reCAPTCHA
                <a href="https://policies.google.com/privacy?hl=en" target="_blank" rel="noopener noreferrer" className="register__firstChild">Privacy</a><a
                    target="_blank" rel="noopener noreferrer" href="https://policies.google.com/terms?hl=en">Terms</a>
            </p>
            <button className="register__button">Войти</button>
        </div>
    );

};

export default LogIn;
