import React, { useState, useEffect } from 'react';
import './style.css';
import { GetInfoPricing } from '~/api/pricing/pricing';
import AuthService from '~/service/auth/auth-service';
import { Link } from 'react-router-dom';

const UserInfo = () => {
    const [currentUser, setCurrentUser] = useState(undefined);
    const [infoPricing, setInfoPricing] = useState(undefined);
    useEffect(() => {
        const fetchData = async () => {
            if (AuthService.getCurrentUser()) {
                setCurrentUser(await AuthService.getCurrentUser());
            }
        };
        fetchData();
    }, []);
    useEffect(() => {
        const fetchPricing = async () => {
            if (currentUser) {
                setInfoPricing(await GetInfoPricing(currentUser.Id));
            }
        };

        fetchPricing();
    }, [currentUser]);
    const formatDateTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        const formattedDateTime = dateTime.toLocaleString('en-GB', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: false,
        });
        return formattedDateTime;
    };
    const formatRemainingTime = (remainingTime) => {
        const timeParts = remainingTime.split(':');
        const days = parseInt(timeParts[0]);
        const timeString = timeParts.slice(1).join(':');
        const remainingTimeSpan = `${days} ${timeString}`;

        const remainingTimeObj = {
            days: days,
            hours: parseInt(timeParts[1]),
            minutes: parseInt(timeParts[2]),
            seconds: parseFloat(timeParts[3]),
        };

        if (remainingTimeObj.days < 0) {
            return 'Hết hạn';
        } else {
            return `${remainingTimeObj.days}d ${remainingTimeObj.hours}h ${remainingTimeObj.minutes}m`;
        }
    };
    return (
        <>
            <nav className="container-fluid">
                <strong className="title-checkout">LA Movies | Infomation Account</strong>
            </nav>
            <main className="container">
                <div className="grid">
                    <section className="custom-form-section">
                        <form className="my-form container">
                            <ul className="ul-checkout">
                                <li>
                                    <div className="grid grid-2">
                                        <input
                                            type="text"
                                            placeholder="Full Name"
                                            required
                                            value={currentUser ? currentUser.FullName : ''}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Username"
                                            required
                                            value={currentUser ? currentUser.Username : ''}
                                        />
                                    </div>
                                </li>
                                <li>
                                    <div className="grid grid-2">
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            required
                                            value={currentUser ? currentUser.Email : ''}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Date Birthday"
                                            value={currentUser ? currentUser.Date : ''}
                                        />
                                    </div>
                                </li>
                                <li>
                                    <div className="grid grid-2">
                                        <input
                                            type="text"
                                            placeholder="text"
                                            disabled
                                            required
                                            value={infoPricing ? infoPricing.namePricing : ''}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Date Birthday"
                                            disabled
                                            value={
                                                'Start time:' + formatDateTime(infoPricing ? infoPricing.startTime : '')
                                            }
                                        />
                                    </div>
                                </li>
                                <li>
                                    <div className="grid grid-2">
                                        <input
                                            type="text"
                                            placeholder="Email"
                                            disabled
                                            required
                                            value={'End time:' + formatDateTime(infoPricing ? infoPricing.endTime : '')}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Date Birthday"
                                            disabled
                                            value={
                                                'Remaining Time: ' +
                                                formatRemainingTime(infoPricing ? infoPricing.remainingTime : '')
                                            }
                                        />
                                    </div>
                                </li>
                                <li>
                                    <div className="grid grid-3 btn-checkout">
                                        <Link to="/changepassword">
                                            <button className="btn-paypal" type="submit">
                                                CHANGE PASSWORD
                                            </button>
                                        </Link>

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

export default UserInfo;
