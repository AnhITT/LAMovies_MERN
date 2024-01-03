import React, { useState, useEffect } from 'react';
import './style.css';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { GetMovieAPI } from '~/api/homes/home';

import Upcomming from '../upcoming/Upcomming';
import ReactPlayer from 'react-player';
const SinglePage = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [movie, setMovie] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const movies = await GetMovieAPI();
            setMovie(movies);
        };

        fetchData();
    }, []); // Fetch data on mount

    useEffect(() => {
        if (movie.length > 0) {
            const selectedItem = movie.find((movieItem) => movieItem.id === parseInt(id));
            if (selectedItem) {
                setItem(selectedItem);
            }
        }
    }, [movie, id]);

    return (
        <>
            {item ? (
                <>
                    <section className="singlePage">
                        <div className="singleHeading">
                            <h1>Trailer {item.name} </h1> <span> | {item.time} | </span> <span> {item.quality} </span>
                        </div>
                        <div className="container">
                            <ReactPlayer url={item.urlTrailer} width="100%" height="605px" controls={true} />
                            <div className="para">
                                {item.type === 'oddMovies' ? (
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

                            <div className="para">
                                <h3>Description:</h3>
                                <p>{item.description}</p>
                            </div>
                            <div className="soical">
                                <h3>Share : </h3>
                                <img src="https://img.icons8.com/color/48/000000/facebook-new.png" />
                                <img src="https://img.icons8.com/fluency/48/000000/twitter-circled.png" />
                                <img src="https://img.icons8.com/fluency/48/000000/linkedin-circled.png" />
                            </div>
                        </div>
                    </section>
                    <Upcomming items={movie} title="Recommended Movies" />
                </>
            ) : (
                'no'
            )}
        </>
    );
};

export default SinglePage;
