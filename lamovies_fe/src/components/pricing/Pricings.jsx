import React, { useEffect, useState } from 'react';
import './pricing.css';
import { GetPricingAPI } from '~/api/pricing/pricing';
import Pricing from './Pricing';

const Pricings = () => {
    const [pricing, setPricing] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        setPricing(await GetPricingAPI());
    };
    return (
        <>
            <main className="container">
                <div className="grid">
                    {pricing.map((item) => {
                        return (
                            <>
                                <Pricing key={item.id} item={item} />
                            </>
                        );
                    })}
                </div>
            </main>
        </>
    );
};

export default Pricings;
