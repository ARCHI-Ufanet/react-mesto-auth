import React, {useState} from 'react';
import {Link } from 'react-router-dom';

export default function Register({handleRegister}) {
    const [formValue, setFormValue] = useState({
        email: '',
        password: '',
    })
    
    const handleChange = (e) => {
        const {name, value} = e.target;
    
        setFormValue({
            ...formValue,
            [name]: value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const email = formValue.email;
        const password = formValue.password;
        handleRegister(email, password);
    }
    return (
        <div className="register">
            <h2 className="register__title">Регистрация</h2>
            <form onSubmit={handleSubmit} className="register__form" name="register" noValidate>
                <input 
                    className="register__input register__input_type_email" 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="Email" 
                    required minLength="2" 
                    maxLength="30"
                    value={formValue.email}
                    onChange={handleChange}
                />
                <span className="register__eror" id="title-error"></span>
                <input 
                    className="register__input register__input_type_password" 
                    name="password" 
                    id="password" 
                    type="password" 
                    placeholder="Пароль" 
                    required minLength="6" 
                    maxLength="30"
                    value={formValue.password}
                    onChange={handleChange}
                />
                <span className="register__eror" id="link-error"></span>
                <button type="submit" className="register__submit-button">Зарегистрироваться</button>
            </form>
            <p className="register__option">Уже зарегистрированы? <Link to="/mesto-react-auth/sign-in" className="register__login-link">Войти</Link></p>
        </div>
    );
};