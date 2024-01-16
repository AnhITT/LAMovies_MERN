import React, { useEffect, useState } from 'react';
import './home.css';
import Home from './Home';

const Homes = ({ items }) => {
    return (
        <>
            <section className="home">
                <Home items={items} />
            </section>
            <div className="mragin"></div>
        </>
    );
};

export default Homes;
