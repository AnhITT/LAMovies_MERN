import React, { useContext, useState, useEffect } from 'react';
import '../../components/watch/style.css';
import { useParams } from 'react-router-dom';
import { GetMovieByID, GetURLOddMovie } from '~/api/homes/home';
import { CreateRoom } from '~/api/room/room';
import { AppContext } from '~/context/AppProvider';
import { useHistory } from 'react-router-dom';
import { Check } from '~/api/order/Order';

const WatchMovie = () => {
    const history = useHistory();
    const { id } = useParams();
    const [movie, setMovie] = useState([]);
    const [check, setCheck] = useState();
    const { currentUser } = useContext(AppContext);

    useEffect(() => {
        const fetchPricing = async () => {
            if (currentUser && currentUser._id) {
                console.log(currentUser);
                const result = await Check(currentUser._id);
                if (result) {
                    setCheck(result);
                }
            }
        };

        fetchPricing();
    }, [currentUser]);

    useEffect(() => {
        const fetchData = async () => {
            console.log(check);
            if (check) {
                const movieData = await GetMovieByID(id);
                setMovie(movieData);
            }
        };
        fetchData();
    }, [check, id]);
    const handleWatchWithFriends = async () => {
        try {
            const response = await CreateRoom(movie.name, currentUser._id);
            history.push(`/room/${response}/${id}`);
        } catch (error) {
            console.error('Error creating room:', error);
        }
    };
    return (
        <>
            {check && check.sucess === true ? (
                <>
                    <section className="singlePage">
                        <div className="singleHeading">
                            <h1>Movie {movie.data && movie.data.name} </h1>{' '}
                            <span> | {movie.data && movie.data.time} | </span>{' '}
                            <span> {movie.data && movie.data.quality} </span>
                        </div>
                        <div className="container">
                            <iframe
                                src={movie.data && movie.data.oddmovie.url}
                                width="100%"
                                height="605px"
                                frameBorder="0"
                                allowFullScreen
                                title="Embedded Content"
                            ></iframe>
                            <div className="para">
                                <button id="btnbtn" className="btn-play primary-btn" onClick={handleWatchWithFriends}>
                                    <i className="fas fa-play"></i> WATCH WITH FRIENDS
                                </button>
                            </div>

                            <div className="para">
                                <h3>Description:</h3>
                                <p>{movie.data && movie.data.description}</p>
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
                        <h1>Movie {movie.data && movie.data.name} </h1>{' '}
                        <span> | {movie.data && movie.data.time} | </span>{' '}
                        <span> {movie.data && movie.data.quality} </span>
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

export default WatchMovie;
