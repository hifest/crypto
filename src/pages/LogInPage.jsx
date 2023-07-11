import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {signInWithEmailAndPassword  } from "firebase/auth";
import {auth} from "../firebase"
const LogInPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const LogIn = (e) =>{
        e.preventDefault()
        setEmail('')
        setPassword('')
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                window.location.replace('/')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    return (
        <form className="register" onSubmit={LogIn}>
            <h2 className="register__header">Вход</h2>

            <div className="register__field">
                <input type="email" placeholder="Email" autoComplete="off" value={email} onChange={(e)=> setEmail(e.target.value)}/>
            </div>

            <div className="register__field">
                <input type="password" placeholder="Пароль" autoComplete="off" value={password} onChange={(e)=> setPassword(e.target.value)}/>
            </div>

            <p className="register__terms">protected by reCAPTCHA
                <a href="https://policies.google.com/privacy?hl=en" target="_blank" rel="noopener noreferrer" className="register__firstChild">Privacy</a><a
                    target="_blank" rel="noopener noreferrer" href="https://policies.google.com/terms?hl=en">Terms</a>
            </p>
            <button className="register__button" type='submit'>Войти</button>
            <p className="tac">
                Нет аккаунта?
                <Link to="/register">Регистрация</Link>
            </p>
        </form>
    );

};

export default LogInPage;
