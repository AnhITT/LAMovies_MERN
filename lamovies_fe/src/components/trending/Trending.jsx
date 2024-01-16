import React, { useState, useEffect } from 'react';
import { GetMovieAPI } from '~/api/homes/home';
import Home from '../homes/Home';
import './style.css';

const Trending = ({ items }) => {
    return (
        <>
            <section className="trending">
                <Home items={items} />
            </section>
        </>
    );
};

export default Trending;
