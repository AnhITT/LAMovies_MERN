import React from 'react';
import { Link } from 'react-router-dom';

const HomeCard = ({
    item: {
        id,
        urlImgCover,
        name,
        quality,
        view,
        time,
        description,
        starring,
        genreNames,
        actorNames,
        minAge,
        tags,
        type,
    },
}) => {
    return (
        <>
            <div className="box">
                <div className="coverImage">
                    <img src={urlImgCover} alt="" />
                </div>
                <div className="content flex">
                    <div className="details row">
                        <h1>{name}</h1>
                        <div className="rating flex">
                            <div className="rate">
                                <i className="fas fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star-half"></i>
                            </div>
                            <label>{view} view</label>
                            <span>{minAge}+</span>
                            <label>{time}</label>
                        </div>
                        <div className="cast">
                            <h4>
                                <span>Starring </span>
                                {actorNames && actorNames.join(', ')}
                            </h4>
                            <h4>
                                <span>Genres </span>
                                {genreNames && genreNames.join(', ')}
                            </h4>
                        </div>
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
                    <div className="palyButton row">
                        <Link to={`/singlepage/${id}`}>
                            <button>
                                <div className="img">
                                    <img src="./images/play-button.png" alt="" />
                                    <img src="./images/play.png" className="change" />
                                </div>
                                WATCH TRAILER
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeCard;
