import React, { useState, useEffect } from 'react';
import { GetPricingAPI } from '~/api/pricing/pricing';
import PricingCard from '~/components/pricing/PricingCard';

const Pricing = () => {
    const [pricing, setPricing] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        setPricing(await GetPricingAPI());
    };
    console.log(pricing.data);
    return (
        <>
            <main className="container">
                <div className="grid">
                    {pricing.data && pricing.data.map((item) => <PricingCard key={item._id} item={item} />)}
                </div>
            </main>
        </>
    );
};

export default Pricing;
