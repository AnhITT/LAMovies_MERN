import React, { useState, useEffect } from 'react';
import './style.css';
import { ChangePasswordAPI } from '~/api/account/account';
import AuthService from '~/service/auth/auth-service';
import { Link } from 'react-router-dom';

const ChangePassword = () => {
    const [currentUser, setCurrentUser] = useState(undefined);
    const [passwordData, setPasswordData] = useState({
        Id: '',
        Password: '',
        NewPassword: '',
    });
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [validationError, setValidationError] = useState('');
    const isPasswordValid = (password) => {
        const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*[#$^+=!*()@%&]).{6,}$/;
        return regex.test(password);
    };
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        setPasswordData({ ...passwordData, Id: currentUser?.Id || '' });
    }, [currentUser]);

    const fetchData = async () => {
        if (AuthService.getCurrentUser()) {
            setCurrentUser(await AuthService.getCurrentUser());
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPasswordData({ ...passwordData, [name]: value });
    };

    const validateForm = () => {
        if (!isPasswordValid(passwordData.NewPassword)) {
            setValidationError(
                'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 special character, and 1 digit. Minimum length is 6.',
            );
            return false;
        }
        if (passwordData.NewPassword !== ConfirmPassword) {
            setValidationError('New Password and Confirm Password do not match.');
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log(passwordData);
            ChangePasswordAPI(passwordData)
                .then((response) => {
                    setValidationError('Change Password Successful');
                })
                .catch((error) => {
                    if (error.response) {
                        setValidationError('Password Invalid');
                    } else {
                        setValidationError('Password Invalid');
                    }
                });
        }
    };

    return (
        <>
            <nav className="container-fluid">
                <strong className="title-checkout">LA Movies | Change Password</strong>
            </nav>
            <main className="container">
                <div className="grid">
                    <section className="custom-form-section">
                        <form className="my-form container" onSubmit={handleSubmit}>
                            <ul className="ul-checkout">
                                <li>
                                    <div className="">
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            name="Password"
                                            value={passwordData.Password}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </li>
                                <li>
                                    <div className="">
                                        <input
                                            type="password"
                                            placeholder="New Password"
                                            name="NewPassword"
                                            value={passwordData.NewPassword}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </li>
                                <li>
                                    <div className="">
                                        <input
                                            type="password"
                                            placeholder="Confirm Password"
                                            name="ConfirmPassword"
                                            value={ConfirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    {validationError && <p className="error-message">{validationError}</p>}
                                </li>
                                <li>
                                    <div className="grid grid-3 btn-checkout">
                                        <button className="btn-paypal" type="submit">
                                            SUBMIT
                                        </button>
                                        <Link to="/">
                                            <button className="btn-grid" type="reset">
                                                BACK
                                            </button>
                                        </Link>
                                    </div>
                                </li>
                            </ul>
                        </form>
                    </section>
                </div>
            </main>
        </>
    );
};

export default ChangePassword;
