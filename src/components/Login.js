import React, {useState} from 'react';

export default function Login({handleLogin}) {
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
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
        if (!formValue.email || !formValue.password){
            return;
        };
        const email = formValue.email;
        const password = formValue.password;
        handleLogin(email, password);
    }

    return (
        <div className="login">
            <h2 className="login__title">Вход</h2>
            <form onSubmit={handleSubmit} className="login__form" name="login" noValidate>
                <input
                    className="login__input login__input_type_email" 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="Email" 
                    required minLength="2" 
                    maxLength="30"
                    value={formValue.email}
                    onChange={handleChange}
                />
                <span className="login__eror" id="title-error"></span>
                <input
                    className="login__input login__input_type_password" 
                    name="password" 
                    id="password" 
                    type="password" 
                    placeholder="Пароль" 
                    required minLength="6" 
                    maxLength="30"
                    value={formValue.password}
                    onChange={handleChange}
                />
                <span className="login__eror" id="link-error"></span>
                <button type="submit" className="login__submit-button">Войти</button>
            </form>
        </div>
    );
};