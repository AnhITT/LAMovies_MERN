import React, { useState, useEffect } from 'react';
import Homes from '~/components/homes/Homes';
import Trending from '~/components/trending/Trending';
import Upcomming from '~/components/upcoming/Upcomming';
import MoviesCom from '~/components/movie/MoviesCom';
import { GetMovieAPI, GetTop6MovieView } from '~/api/homes/home';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from 'react-spinners/ClipLoader';
import './HomePage.css';

const HomePage = () => {
    const location = useLocation();
    const [movie, setMovie] = useState([]);
    const [top6Movie, setTop6Movie] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
        const params = new URLSearchParams(location.search);
        const loginSuccess = params.get('loginSuccess');

        if (loginSuccess === 'true') {
            toast.success('Login successful!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }, [location.search]);

    const fetchData = async () => {
        try {
            const movieData = await GetMovieAPI();
            const top6MovieData = await GetTop6MovieView();

            setMovie(movieData);
            setTop6Movie(top6MovieData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <ClipLoader color={'red'} loading={loading} size={150} aria-label="Loading Spinner" />
            </div>
        );
    }
    return (
        <>
            <Homes items={movie.data} />
            <MoviesCom items={movie.data} title="List Movie" />
            <Upcomming items={top6Movie.data} title="Top Movies" />
            <Upcomming items={movie.data} title="Latest Movies" />
            <Trending items={movie.data} />
            <Upcomming items={movie.data} title="Recommended Movies" />
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

export default HomePage;
