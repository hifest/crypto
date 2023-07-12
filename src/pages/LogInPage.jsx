import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {signInWithEmailAndPassword ,sendPasswordResetEmail  } from "firebase/auth";
import {auth} from "../firebase"
import Modal from "../components/Modal";
const LogInPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error,setError] = useState(false)
    const [modalActive,setModalActive] = useState(false)
    const [modalInfo,setModalInfo] = useState(false)
    const LogIn = (e) =>{
        e.preventDefault()
        setEmail('')
        setPassword('')
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                window.location.replace('/')
            })
            .catch((error) => {
                setError(true)
            });
    }

    const ResetPassword = () =>{
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setModalInfo("Все хорошо,вам отправлено письмо на ваш email,проверьте папку спам")
            })
            .catch((error) => {
                setModalInfo("Что-то пошло не так,попробуйте еще раз или проверьте правильность email адресса")
            });
    }

    return (
        <>
        <form className="register" onSubmit={LogIn}>
            <h2 className="register__header">Вход</h2>


            <div className="form__group field">
                <input type="input" className="form__field" placeholder="Email"  min={5} max={50} value={email} onChange={(e)=> setEmail(e.target.value)} required/>
                <label htmlFor="name" className="form__label">Email</label>
            </div>

            <div className="form__group field">
                <input type="password" className="form__field" placeholder="Пароль" min={10} max={50} value={password} onChange={(e)=> setPassword(e.target.value)} required/>
                <label htmlFor="name" className="form__label">Пароль</label>
            </div>


            <p className="register__terms">protected by reCAPTCHA
                <a href="https://policies.google.com/privacy?hl=en" target="_blank" rel="noopener noreferrer" className="register__firstChild">Privacy</a><a
                    target="_blank" rel="noopener noreferrer" href="https://policies.google.com/terms?hl=en">Terms</a>
            </p>
            {error ? <p className="red tac">Не правильний логин или пароль</p>  : null}
            <button className="register__button" type='submit'>Войти</button>
            <a className="register__button" onClick={()=>{setModalActive(true)}}>Востановить пароль</a>
            <p className="tac">
                Нет аккаунта?
                <Link to="/register">Регистрация</Link>
            </p>
        </form>
            <Modal active={modalActive} setActive={setModalActive}>
                <div className="form__group field">
                    <input type="input" className="form__field"  min={5} max={50} placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)} required/>
                    <label htmlFor="name" className="form__label">Email</label>
                </div>
                <button className="register__button m2auto" onClick={ResetPassword}>Востановить пароль</button>
                {modalInfo ? <p className="red tac">{modalInfo}</p> : null}
            </Modal>
        </>
    );

};

export default LogInPage;
