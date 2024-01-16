import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '~/context/AppProvider';
import { Link } from 'react-router-dom';
import './pricing.css';

const PricingCard = ({ item: { _id, name, price, time } }) => {
    const { currentUser } = useContext(AppContext);

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
            {currentUser.userName ? (
                <div>
                    <Link to={{ pathname: `/checkout/${_id}`, state: { item: { _id, name, price, time } } }}>
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

export default PricingCard;
