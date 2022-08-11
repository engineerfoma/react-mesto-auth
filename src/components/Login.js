import React, { useState } from 'react';
import AuthWithForm from './AuthWithForm';

function Login({ handleSubmit, handleChangeEmail, handleChangePassword }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
                    value={email}
                    onChange={handleChangeEmail}
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
                    value={password}
                    onChange={handleChangePassword}
                    placeholder="Пароль"
                    className="auth__input auth__input_password"
                    required
                />
            </div>
        </AuthWithForm>
    )
}

export default Login;