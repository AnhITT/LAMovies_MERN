import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '~/context/AppProvider';
import './style.css';
import { useLocation, Link, useParams } from 'react-router-dom';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { ToastContainer, toast } from 'react-toastify';
import { CreateOrder, Check } from '~/api/order/Order';
import 'react-toastify/dist/ReactToastify.css';

const CheckOut = () => {
    const location = useLocation();
    const { item } = location.state || {};
    const { currentUser } = useContext(AppContext);
    const currentDate = new Date();
    const dateStart = new Date();
    const dateEnd = new Date(dateStart);
    const [dataOrder, setDataOrder] = useState({
        users: '',
        pricings: '',
        startTime: '',
        endTime: '',
        totalAmount: '',
    });
    dateStart.setDate(currentDate.getDate() + item.time);
    dateEnd.setMonth(dateStart.getMonth() + item.time);
    const formattedDateStart = `${dateStart.getDate()}/${dateStart.getMonth() + 1}/${dateStart.getFullYear()}`;
    const formattedDateEnd = `${dateEnd.getDate()}/${dateEnd.getMonth() + 1}/${dateEnd.getFullYear()}`;
    const onApproveOrder = (data, actions) => {
        return actions.order.capture().then(async (details) => {
            const formattedDateStart = dateStart.toISOString();
            const formattedDateEnd = dateEnd.toISOString();
            setDataOrder({
                users: currentUser._id,
                pricings: item._id,
                startTime: formattedDateStart,
                endTime: formattedDateEnd,
                totalAmount: item.price,
            });
        });
    };
    useEffect(() => {
        const sendDataOrderToApi = async () => {
            try {
                await CreateOrder(dataOrder);
                toast.success('Register Service Successful!', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } catch (error) {
                console.error('Error calling CreateOrder API:', error);
            }
        };

        if (dataOrder.users !== '' && dataOrder.pricings !== '') {
            sendDataOrderToApi();
        }
    }, [dataOrder]);

    const onCreateOrder = (data, actions) => {
        const uniqueSku = `sku-${Date.now()}`;
        return actions.order.create({
            purchase_units: [
                {
                    name: item.name,
                    quantity: '1',
                    sku: uniqueSku,
                    tax: '0',
                    description: `${item.time} month`,
                    amount: {
                        value: item.price,
                    },
                    value: item.price,
                },
            ],
        });
    };
    return (
        <>
            <nav className="container-fluid">
                <strong className="title-checkout">LA Movies | Payment</strong>
            </nav>
            <main className="container">
                <div className="grid">
                    <section className="custom-form-section">
                        <form className="my-form container">
                            <ul className="ul-checkout">
                                <li>
                                    <select>
                                        <option disabled>-- Please choose an option --</option>
                                        <option>Paypal</option>
                                    </select>
                                </li>
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
                                            value={currentUser ? currentUser.dateBirthday : ''}
                                        />
                                    </div>
                                </li>
                                <li>
                                    <textarea placeholder="Message"></textarea>
                                </li>

                                <li>
                                    <div className="grid grid-3 btn-checkout">
                                        {/* <button className="btn-paypal" type="submit">
                                            PAYMENT WITH PAYPAL
                                        </button> */}
                                        <div className="paypal-button-container">
                                            <PayPalButtons
                                                style={{
                                                    color: 'silver',
                                                    layout: 'horizontal',
                                                    height: 48,
                                                    tagline: false,
                                                    shape: 'pill',
                                                }}
                                                createOrder={(data, actions) => onCreateOrder(data, actions)}
                                                onApprove={(data, actions) => onApproveOrder(data, actions)}
                                                onCancel={() => {}}
                                            />
                                        </div>
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
                    {item ? (
                        <section className="custom-pricing-info">
                            <article className="custom-pricing-block">
                                <hgroup className="title-1">
                                    <h2>Information Pricing</h2>
                                </hgroup>
                                <p>
                                    <strong>Name:</strong> {item.name}
                                </p>
                                <p>
                                    <strong>Price:</strong> ${item.price}
                                </p>
                                <p>
                                    <strong>Time:</strong> {item.time} months
                                </p>
                                <p>
                                    <strong>Date Start:</strong> {formattedDateStart}
                                </p>
                                <p>
                                    <strong>Date End:</strong> {formattedDateEnd}
                                </p>
                                <p>
                                    <strong>Total:</strong> ${item.price}
                                </p>
                            </article>
                        </section>
                    ) : (
                        'no'
                    )}
                </div>
            </main>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </>
    );
};

export default CheckOut;
