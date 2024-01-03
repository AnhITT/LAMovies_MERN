import React from 'react';
import { Link } from 'react-router-dom';

const Ucard = ({ item: { id, urlImgCover, name, time, type } }) => {
    return (
        <>
            <div className="MovieBox">
                <div className="img">
                    <img src={urlImgCover} alt="" />
                </div>
                <div className="text">
                    <h3>{name}</h3>
                    <span>{time}</span> <br />
                    {type === 'oddMovies' ? (
                        <Link to={`/watchmovie/${id}`}>
                            <button className="btn-play primary-btn">
                                <i className="fas fa-play"></i> PLAY NOW
                            </button>
                        </Link>
                    ) : (
                        <Link to={`/watchmovieseries/${id}`}>
                            <button className="btn-play primary-btn">
                                <i className="fas fa-play"></i> PLAY NOW
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
};

export default Ucard;
