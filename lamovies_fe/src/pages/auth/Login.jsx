import React, { useState } from 'react';
import './style.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const validate = () => {
        if (!userName && !password) {
            setError({ error: 'Please enter username and password!' });
            return false;
        } else if (!userName) {
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
                    'http://localhost:3000/authen/login',
                    { userName, password },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    },
                )
                .then((response) => {
                    if (response.status === 200) {
                        window.location.href = '/?loginSuccess=true';
                    } else {
                        setError({ error: response.data });
                    }
                })
                .catch((error) => {
                    if (error.response) {
                        setError({ error: error.response.data.data });
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
                                value={userName}
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
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    );
};

export default Login;
