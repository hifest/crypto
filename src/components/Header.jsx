import React, {useState} from 'react';
import {auth} from "../firebase"
import {useEffect} from "react";
import {onAuthStateChanged, signOut} from "firebase/auth";
import { Link } from "react-router-dom";



export const UserContext = React.createContext()
const Header = () => {
    const [isUserReg,setIsUserReg] = useState(false)
    const [toogleClass,setToogleClass] = useState(false)

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsUserReg(true)
            } else {
                setIsUserReg(false)
            }
        });
    },[])

    const Exit = () =>{
        signOut(auth).then(() => {
            window.location.replace('/register')
        })
    }

    const toogleClassFunc = () =>{
        setToogleClass(!toogleClass)
    }

    return (
        <UserContext.Provider value={{ isUserReg, setIsUserReg }}>
        <div className="header">
            <div className="header__container">
                <Link to="/" className="header__logo">
                    <h1>CryptoExchange</h1>
                </Link>
                <div className="header__info">
                    <Link to="/" className="header_link">Обменять</Link>
                    <Link to="/reserves" className="header_link">Резервы</Link>
                    <Link to="/partners" className="header_link">Партнерам</Link>
                    <Link to="/FAQ" className="header_link">FAQ</Link>
                    <Link to="/history" className="header_link">История</Link>
                    <Link to="https://t.me/maestro41L" className="header_link">Тех. поддержка</Link>
                </div>
                <div className={toogleClass ? "hamburger hamburger_active" : "hamburger"} onClick={toogleClassFunc}>
                    <span className="firstSpan"></span>
                    <span className="secondSpan"></span>
                    <span className="thirdSpan"></span>
                </div>
                <nav className="header__btn">
                    {isUserReg ? <button className="btn_reg" onClick={Exit}>Выйти</button> :
                        <div className="header__btn_box">
                            <Link to="/login" className="header_link">Войти</Link>
                            <Link to="/register" className="header_link second">Регистрация</Link>
                        </div>
                    }
                </nav>
            </div>
            <ul className={toogleClass ? "menu_active menu" : "menu"}>
                <div>
                    <Link to="/" className="header_link">Обменять</Link>
                    <Link to="/reserves" className="header_link">Резервы</Link>
                    <Link to="/partners" className="header_link">Партнерам</Link>
                    <Link to="/FAQ" className="header_link">FAQ</Link>
                    <Link to="/history" className="header_link">История</Link>
                    <Link to="https://t.me/maestro41L" className="header_link">Тех. поддержка</Link>
                    {isUserReg ? <button className="btn_reg" onClick={Exit}>Выйти</button> :
                        <div className="header__btn_box">
                            <Link to="/login" className="header_link">Войти</Link>
                            <Link to="/register" className="header_link second">Регистрация</Link>
                        </div>
                    }
                </div>
            </ul>
        </div>
        </UserContext.Provider>
    );

};

export default Header;
