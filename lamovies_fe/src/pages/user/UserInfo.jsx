import React, { useState, useEffect, useContext } from 'react';
import './style.css';
import { AppContext } from '~/context/AppProvider';
import { Link } from 'react-router-dom';
import { Check } from '~/api/order/Order';

const UserInfo = () => {
    const { currentUser } = useContext(AppContext);
    const [check, setCheck] = useState();
    const [remainingTime, setRemainingTime] = useState('');
    useEffect(() => {
        const fetchPricing = async () => {
            if (currentUser && currentUser._id) {
                console.log(currentUser);
                const result = await Check(currentUser._id);
                if (result) {
                    setCheck(result.data);

                    const endTime = new Date(result.data.endTime);
                    const currentTime = new Date();
                    const diffInMilliseconds = endTime - currentTime;
                    if (diffInMilliseconds <= 0) {
                        setRemainingTime('Hết hạn');
                    } else {
                        const days = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
                        const hours = Math.floor((diffInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                        const minutes = Math.floor((diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
                        setRemainingTime(`${days}d ${hours}h ${minutes}m`);
                    }
                }
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
                                            value={currentUser ? currentUser.fullName : ''}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Username"
                                            required
                                            value={currentUser ? currentUser.userName : ''}
                                        />
                                    </div>
                                </li>
                                <li>
                                    <div className="grid grid-2">
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            required
                                            value={currentUser ? currentUser.email : ''}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Date Birthday"
                                            value={'Date Birthday:' + currentUser ? currentUser.dateBirthday : ''}
                                        />
                                    </div>
                                </li>
                                {check != null ? (
                                    <>
                                        <li>
                                            <div className="grid grid-2">
                                                <input
                                                    type="text"
                                                    placeholder="text"
                                                    disabled
                                                    required
                                                    value={check && check.users}
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Date Birthday"
                                                    disabled
                                                    value={'Start time:' + formatDateTime(check ? check.startTime : '')}
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
                                                    value={'End time:' + formatDateTime(check ? check.endTime : '')}
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Date Birthday"
                                                    disabled
                                                    value={'Remaining Time: ' + (remainingTime ? remainingTime : '')}
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
                                    </>
                                ) : (
                                    <></>
                                )}
                            </ul>
                        </form>
                    </section>
                </div>
            </main>
        </>
    );
};

export default UserInfo;
