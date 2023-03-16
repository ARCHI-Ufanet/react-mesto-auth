import React, { useState } from "react";
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import logo from '../../src/images/logo.svg';

export default function Header({userInfo, loggedIn, logout}) {
    const navigate = useNavigate();
    function handleLogoutClick() {
        logout();
    }

    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип сайта"/>
            <div className="header__nav">
                <p className="header__user-email">{userInfo}</p>
                <button onClick={handleLogoutClick} className="header__login-button">{loggedIn ? 'Выйти' : ' '}</button>
                <Routes>
                    <Route path="/sign-up" element={<Link to="/sign-in" className="register__login-link">Войти</Link>} />
                    <Route path="/sign-in" element={<Link to="/sign-up" className="register__login-link">Регистрация</Link>} />
                </Routes>
            </div>
        </header>
    );
};