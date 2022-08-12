import React, { useState } from 'react';
import AuthWithForm from './AuthWithForm';

function Login({ onLogin }) {
    const [loginData, setLoginData] = useState({
        fieldEmail: '',
        fieldPassword: '',
    })

    function handleChange(e) {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value,
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        onLogin(loginData)
            .catch(err => `${err}: ${err.meassage}`);
    }


    return (
        <AuthWithForm
            title="Вход"
            name="enter"
            buttonName="Войти"
            handleSubmit={handleSubmit}
        >
            <div className="auth__form_item">
                <input
                    type="text"
                    id="email-input"
                    name="fieldEmail"
                    value={loginData.fieldEmail}
                    onChange={handleChange}
                    placeholder="Email"
                    className="auth__input auth__input_email"
                    minLength="2"
                    maxLength="40"
                    required
                />
            </div>
            <div className="auth__form_item">
                <input
                    type="password"
                    id="password-input"
                    name="fieldPassword"
                    value={loginData.fieldPassword}
                    onChange={handleChange}
                    placeholder="Пароль"
                    className="auth__input auth__input_password"
                    required
                />
            </div>
        </AuthWithForm>
    )
}

export default Login;