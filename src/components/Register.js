import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthWithForm from './AuthWithForm';

function Register({ handleSubmit, handleChangeEmail, handleChangePassword }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
            <AuthWithForm
                title="Регистрация"
                name="registration"
                buttonName="Зарегистрироваться"
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
            <div className="link">
                <span className="link__title">Уже зарегистрированы?</span>
                <Link className="link__enter hover">Войти</Link>
            </div>
        </>
    )
}

export default Register;