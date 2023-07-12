import React, {useState} from 'react';
import {createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebase"
import { Link } from "react-router-dom";
import { getDatabase, ref, set } from "firebase/database";
import uuid4 from "uuid4";

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const regUser = (e) => {
        e.preventDefault()
        setEmail('')
        setLogin('')
        setPassword('')

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                const userId = uuid4()
                const db = getDatabase();

                set(ref(db, 'users/' + userId), {
                    login: login,
                    email: email,
                    userID: user.uid
                }).then(window.location.replace('/'));

            })

    }
    return (
        <form className="register" onSubmit={regUser}>
            <h2 className="register__header">Регистрация</h2>


            <div className="form__group field">
                <input type="email" className="form__field" placeholder="Email" min={5} max={50} value={email} onChange={(e)=> setEmail(e.target.value)}  required  autoComplete="off"/>
                <label htmlFor="name" className="form__label">Email</label>
            </div>


            <div className="form__group field">
                <input type="input" className="form__field" placeholder="Логин" min={2} max={50} value={login} onChange={(e)=> setLogin(e.target.value)} required  autoComplete="off"/>
                <label htmlFor="name" className="form__label">Логин</label>
            </div>


            <div className="form__group field">
                <input type="password" className="form__field" placeholder="Пароль" min={10} max={50} value={password} onChange={(e)=> setPassword(e.target.value)} required  autoComplete="off"/>
                <label htmlFor="name" className="form__label">Пароль</label>
            </div>


            <p className="register__terms">protected by reCAPTCHA
                <a href="https://policies.google.com/privacy?hl=en" target="_blank" rel="noopener noreferrer" className="register__firstChild">Privacy</a><a
                target="_blank" rel="noopener noreferrer" href="https://policies.google.com/terms?hl=en">Terms</a>
            </p>
            <button className="btn_reg" type="submit">Зарегистрироваться</button>

            <p className="tac">
                Уже есть аккаунт?
                <Link to="/login">Войти</Link>
            </p>
        </form>
    );

};

export default RegisterPage;
