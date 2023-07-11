import React from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {

    return (
        <div className="register">
            <h2 className="register__header">Регистрация</h2>

            <div className="register__field">
                <input type="text" placeholder="Email"/>
            </div>
            <div className="register__field">
                <input type="text" placeholder="Логин"/>
            </div>
            <div className="register__field">
                <input type="text" placeholder="Пароль"/>
            </div>
            <div className="register__field">
                <input type="text" placeholder="Повторите пароль"/>
            </div>

            <p className="register__terms">protected by reCAPTCHA
                <a href="https://policies.google.com/privacy?hl=en" target="_blank" rel="noopener noreferrer" className="register__firstChild">Privacy</a><a
                target="_blank" rel="noopener noreferrer" href="https://policies.google.com/terms?hl=en">Terms</a>
            </p>
            <button className="register__button">Зарегистрироваться</button>
        </div>
    );

};

export default Register;
