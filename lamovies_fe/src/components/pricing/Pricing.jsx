import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import './pricing.css';
import AuthService from '~/service/auth/auth-service';

const Pricing = ({ item: { id, name, price, time } }) => {
    const [currentUser, setCurrentUser] = useState(undefined);
    useEffect(() => {
        if (AuthService.getCurrentUser()) {
            setCurrentUser(AuthService.getCurrentUser());
        }
    }, []);
    return (
        <section>
            <hgroup>
                <h2>{name}</h2>
                <h3>{price} $</h3>
            </hgroup>
            <p>Time: {time} month</p>
            <p>Video Quality: Unlimited</p>
            <p>American Tv Shows: &times;</p>
            <p>Hollywood Movies: &times;</p>
            <p>New Movies: &times;</p>
            <p>StreamIt Special: &times;</p>
            {currentUser ? (
                <div>
                    <Link to={`/checkout/${id}`}>
                        <button className="btnPricing">Subscribe {name}</button>
                    </Link>
                </div>
            ) : (
                <div>
                    <Link to="/login">
                        <button className="btnPricing">Subscribe {name}</button>
                    </Link>
                </div>
            )}
        </section>
    );
};

export default Pricing;
