import React, { useState, useEffect } from 'react';
import '../../components/watch/style.css';
import { useParams } from 'react-router-dom';
import { GetURLSeriesMovies, GetMovieByID } from '~/api/homes/home';
import { CheckPricing } from '~/api/pricing/pricing';
import AuthService from '~/service/auth/auth-service';

const WatchMovieSeries = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState([]);
    const [url, setUrl] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [check, setCheck] = useState();

    useEffect(() => {
        const fetchData = async () => {
            if (AuthService.getCurrentUser()) {
                setCurrentUser(await AuthService.getCurrentUser());
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchPricing = async () => {
            if (currentUser) {
                setCheck(await CheckPricing(currentUser.Id));
            }
        };

        fetchPricing();
    }, [currentUser]);
    useEffect(() => {
        const fetchData = async () => {
            const movieData = await GetMovieByID(id);
            setMovie(movieData);
            if (check) {
                const data = await GetURLSeriesMovies(id, 1);
                setUrl(data);
            }
        };

        fetchData();
    }, [check, id]);

    const handleTapButtonClick = async (tapNumber) => {
        const urlData = await GetURLSeriesMovies(id, tapNumber);
        setUrl(urlData);
    };
    console.log(url.url);
    return (
        <>
            {check === true ? (
                <>
                    <section className="singlePage">
                        <div className="singleHeading">
                            <h1>Movie {movie.name} </h1>
                            <span> | Episode {url.tap} | </span> <span> {movie.time} | </span>{' '}
                            <span> {movie.quality} </span>
                        </div>
                        <div className="container">
                            <iframe
                                src={url.url}
                                width="100%"
                                height="605px"
                                frameBorder="0"
                                allowFullScreen
                                title="Embedded Content"
                            ></iframe>

                            <div className="episodeButtons">
                                <div className="tapButtonsContainer">
                                    {[...Array(url.totalTap).keys()].map((tapNumber) => (
                                        <button
                                            key={tapNumber}
                                            className={`tapButton ${tapNumber + 1 === url.tap ? 'active' : ''}`}
                                            onClick={() => handleTapButtonClick(tapNumber + 1)}
                                        >
                                            Episode {tapNumber + 1}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="para">
                                <h3>Description:</h3>
                                <p>{movie.description}</p>
                            </div>
                            <div className="soical">
                                <h3>Share : </h3>
                                <img src="https://img.icons8.com/color/48/000000/facebook-new.png" />
                                <img src="https://img.icons8.com/fluency/48/000000/twitter-circled.png" />
                                <img src="https://img.icons8.com/fluency/48/000000/linkedin-circled.png" />
                            </div>
                        </div>
                    </section>
                </>
            ) : (
                <section className="singlePage">
                    <div className="singleHeading">
                        <h1>Movie {movie.name} </h1> <span> | {movie.time} | </span> <span> {movie.quality} </span>
                    </div>
                    <div className="container">
                        <div className="para">
                            <div className="singleHeading">
                                <h1>PLEASE REGISTER TO USE THE SERVICE TO WATCH MOVIES</h1>
                            </div>
                        </div>

                        <div className="para">
                            <h3>Description:</h3>
                            <p>{movie.description}</p>
                        </div>
                        <div className="soical">
                            <h3>Share : </h3>
                            <img src="https://img.icons8.com/color/48/000000/facebook-new.png" />
                            <img src="https://img.icons8.com/fluency/48/000000/twitter-circled.png" />
                            <img src="https://img.icons8.com/fluency/48/000000/linkedin-circled.png" />
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default WatchMovieSeries;
