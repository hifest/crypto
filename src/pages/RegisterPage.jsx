import React, {useState} from 'react';
import {createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebase"
import { Link } from "react-router-dom";
import { getDatabase, ref, set } from "firebase/database";
import uuid4 from "uuid4";

const RegisterPage = () => {

    const database = getDatabase();
    const [email, setEmail] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const regUser = (e) => {
        e.preventDefault()
        setEmail('')
        setLogin('')
        setPassword('')
        setRepeatPassword('')
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;

                const userId = uuid4()
                const db = getDatabase();
                set(ref(db, 'users/' + userId), {
                    login: login,
                    email: email,
                });
                window.location.replace('/')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });

    }
    return (
        <form className="register" onSubmit={regUser}>
            <h2 className="register__header">Регистрация</h2>

            <div className="register__field">
                <input type="email" placeholder="Email" autoComplete="off" value={email} onChange={(e)=> setEmail(e.target.value)}/>
            </div>
            <div className="register__field">
                <input type="text" placeholder="Логин" autoComplete="off" value={login} onChange={(e)=> setLogin(e.target.value)}/>
            </div>
            <div className="register__field">
                <input type="password" placeholder="Пароль" autoComplete="off" value={password} onChange={(e)=> setPassword(e.target.value)}/>
            </div>
            <div className="register__field">
                <input type="password" placeholder="Повторите пароль" autoComplete="off" value={repeatPassword} onChange={(e)=> setRepeatPassword(e.target.value)}/>
            </div>

            <p className="register__terms">protected by reCAPTCHA
                <a href="https://policies.google.com/privacy?hl=en" target="_blank" rel="noopener noreferrer" className="register__firstChild">Privacy</a><a
                target="_blank" rel="noopener noreferrer" href="https://policies.google.com/terms?hl=en">Terms</a>
            </p>
            <button className="register__button" type="submit">Зарегистрироваться</button>

            <p className="tac">
                Уже есть аккаунт?
                <Link to="/login">Войти</Link>
            </p>
        </form>
    );

};

export default RegisterPage;
