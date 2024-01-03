import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import AuthService from '~/service/auth/auth-service';

const Header = () => {
    const [Mobile, setMobile] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);
    useEffect(() => {
        if (AuthService.getCurrentUser()) {
            setCurrentUser(AuthService.getCurrentUser());
        }
    }, []);

    const logout = () => {
        AuthService.logout();
        window.location.href = '/';
    };
    return (
        <>
            <header>
                <div className="container flexSB">
                    <nav className="flexSB">
                        <div className="logo">
                            <a href="/" className="title">
                                LA MOVIES
                            </a>
                        </div>
                        {/*<ul className='flexSB'>*/}
                        <ul className={Mobile ? 'navMenu-list' : 'flexSB'} onClick={() => setMobile(false)}>
                            <li>
                                <a href="/">Home</a>
                            </li>
                            <li>
                                <a href="/">Series</a>
                            </li>
                            <li>
                                <Link to="/listmovie">Movies</Link>
                            </li>
                            <li>
                                <a href="/">Pages</a>
                            </li>
                            <li>
                                <Link to="/pricing">Pricing</Link>
                            </li>
                            <li>
                                <a href="/">Contact</a>
                            </li>
                        </ul>
                        <button className="toggle" onClick={() => setMobile(!Mobile)}>
                            {Mobile ? <i className="fa fa-times"></i> : <i className="fa fa-bars"></i>}
                        </button>
                    </nav>
                    <div className="account flexSB">
                        <Link to="/listmovie">
                            <i className="fa fa-search"></i>
                        </Link>
                        <Link to="/notifications">
                            <i className="fas fa-bell"></i>
                        </Link>
                        {currentUser ? (
                            <div>
                                <Link to="/userinfo">
                                    <i className="fas fa-user"></i>
                                </Link>
                                <Link to="/">
                                    <button onClick={logout}>Logout</button>
                                </Link>
                            </div>
                        ) : (
                            <div>
                                <Link to="/register">
                                    <i className="fas fa-user"></i>
                                </Link>
                                <Link to="/login">
                                    <button>Login</button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
