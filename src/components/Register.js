import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthWithForm from './AuthWithForm';

function Register({ onRegister }) {
    const [registerData, setRegisterData] = useState({
        fieldEmail: '',
        fieldPassword: '',
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setRegisterData({
            ...registerData,
            [name]: value,
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        onRegister(registerData)
            .catch(err => `${err}: ${err.message}`);
    }

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
                        value={registerData.fieldEmail}
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
                        value={registerData.fieldPassword}
                        onChange={handleChange}
                        placeholder="Пароль"
                        className="auth__input auth__input_password"
                        required
                    />
                </div>
            </AuthWithForm>
            <div className="link">
                <span className="link__title">Уже зарегистрированы?</span>
                <Link to="/sign-in" className="link__enter hover">Войти</Link>
            </div>
        </>
    )
}

export default Register;