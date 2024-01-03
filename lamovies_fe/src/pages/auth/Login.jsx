import React, { useState } from 'react';
import './style.css';
import axios from 'axios';
import { setAuthToken } from '../../service/auth/auth-header';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const validate = () => {
        if (!username && !password) {
            setError({ error: 'Please enter username and password!' });
            return false;
        } else if (!username) {
            setError({ error: 'Please enter a username!' });
            return false;
        } else if (!password) {
            setError({ error: 'Please enter a password!' });
            return false;
        }
        return true;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (validate()) {
            axios
                .post(
                    'https://localhost:7279/api/Auth/login',
                    { username, password },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    },
                )
                .then((response) => {
                    if (response.status === 200) {
                        console.log(response.data.token);
                        localStorage.setItem('token', response.data.token);
                        setAuthToken(response.data.token);
                        window.location.href = '/';
                    } else {
                        setError({ error: response.data.error });
                        console.log(response.data.error);
                    }
                })
                .catch((error) => {
                    if (error.response) {
                        setError({ error: error.response.data.error });
                        console.log(error.response.data.error);
                    } else {
                        console.log('Error:', error.message);
                    }
                });
        }
    };

    return (
        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100">
                    <div className="login100-pic js-tilt" data-tilt>
                        <img src="./images/imglogin.png" alt="" />
                    </div>

                    <form className="login100-form validate-form" onSubmit={handleLogin}>
                        <span className="login100-form-title">Login</span>

                        <div className="wrap-input100 validate-input">
                            <input
                                className="input100"
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <span className="focus-input100"></span>
                            <span className="symbol-input100">
                                <i className="fa fa-envelope" aria-hidden="true"></i>
                            </span>
                        </div>

                        <div className="wrap-input100 validate-input" data-validate="Password is required">
                            <input
                                className="input100"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span className="focus-input100"></span>
                            <span className="symbol-input100">
                                <i className="fa fa-lock" aria-hidden="true"></i>
                            </span>
                        </div>

                        <div className="container-login100-form-btn">
                            <button className="login100-form-btn" type="submit">
                                Login
                            </button>
                        </div>
                        <p className="error-message">{error.error}</p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
