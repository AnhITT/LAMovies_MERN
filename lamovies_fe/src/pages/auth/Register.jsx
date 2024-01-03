import React, { useState } from 'react';
import './style.css';
import axios from 'axios';
import { setAuthToken } from '../../service/auth/auth-header';

const Register = () => {
    const [data, setData] = useState({
        username: '',
        password: '',
        rePassword: '',
        email: '',
        fullName: '',
        dateBirthday: '',
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setData((previousState) => {
            return { ...previousState, [e.target.name]: e.target.value };
        });
    };

    const validate = () => {
        if (
            !data.username ||
            !data.password ||
            !data.fullName ||
            !data.dateBirthday ||
            !data.email ||
            !data.rePassword
        ) {
            setError({ error: 'Please enter info!' });
            return false;
        } else if (data.password !== data.rePassword) {
            setError({ error: 'Passwords do not match!' });
            return false;
        }
        return true;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (validate()) {
            axios
                .post(
                    'https://localhost:7279/api/Auth/register',
                    {
                        username: data.username,
                        email: data.email,
                        password: data.password,
                        passwordConfirm: data.rePassword,
                        fullName: data.fullName,
                        dateBirthday: data.dateBirthday,
                    },
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
                        console.log(data);
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
                        <span className="login100-form-title">Register</span>

                        <div className="wrap-input100 validate-input">
                            <input
                                className="input100"
                                type="text"
                                placeholder="Username"
                                value={data.username}
                                name="username"
                                onChange={handleChange}
                            />
                            <span className="focus-input100"></span>
                            <span className="symbol-input100">
                                <i className="fa fa-user" aria-hidden="true"></i>
                            </span>
                        </div>

                        <div className="wrap-input100 validate-input">
                            <input
                                className="input100"
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={data.password}
                                onChange={handleChange}
                            />
                            <span className="focus-input100"></span>
                            <span className="symbol-input100">
                                <i className="fa fa-lock" aria-hidden="true"></i>
                            </span>
                        </div>
                        <div className="wrap-input100 validate-input" data-validate="Password is required">
                            <input
                                className="input100"
                                type="password"
                                placeholder="Re Password"
                                name="rePassword"
                                value={data.rePassword}
                                onChange={handleChange}
                            />
                            <span className="focus-input100"></span>
                            <span className="symbol-input100">
                                <i className="fa fa-lock" aria-hidden="true"></i>
                            </span>
                        </div>
                        <div className="wrap-input100 validate-input" data-validate="Fullname is required">
                            <input
                                className="input100"
                                type="text"
                                placeholder="Full Name"
                                value={data.fullName}
                                name="fullName"
                                onChange={handleChange}
                            />
                            <span className="focus-input100"></span>
                            <span className="symbol-input100">
                                <i className="fa fa-user" aria-hidden="true"></i>
                            </span>
                        </div>

                        <div className="wrap-input100 validate-input" data-validate="Email is required">
                            <input
                                className="input100"
                                type="email"
                                placeholder="Email"
                                value={data.email}
                                name="email"
                                onChange={handleChange}
                            />
                            <span className="focus-input100"></span>
                            <span className="symbol-input100">
                                <i className="fa fa-envelope" aria-hidden="true"></i>
                            </span>
                        </div>
                        <div className="wrap-input100 validate-input" data-validate="Date is required">
                            <input
                                className="input100"
                                type="date"
                                placeholder="Date Birthday"
                                name="dateBirthday"
                                value={data.dateBirthday}
                                onChange={handleChange}
                            />
                            <span className="focus-input100"></span>
                            <span className="symbol-input100">
                                <i className="fa fa-calendar" aria-hidden="true"></i>
                            </span>
                        </div>
                        <div className="container-login100-form-btn">
                            <button className="login100-form-btn" type="submit">
                                Register
                            </button>
                        </div>
                        <p className="error-message">{error.error}</p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
