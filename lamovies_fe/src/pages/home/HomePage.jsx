import React, { useState, useEffect } from 'react';
import Homes from '~/components/homes/Homes';
import Trending from '~/components/trending/Trending';
import Upcomming from '~/components/upcoming/Upcomming';
import MoviesCom from '~/components/movie/MoviesCom';
import { GetMovieAPI, GetTop6MovieView } from '~/api/homes/home';

const HomePage = () => {
    const [movie, setMovie] = useState([]);
    const [top6Movie, setTop6Movie] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            setMovie(await GetMovieAPI());
            setTop6Movie(await GetTop6MovieView());
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle error, e.g., show an error message to the user
        }
    };
    return (
        <>
            <Homes />
            <MoviesCom items={movie} title="List Movie" />
            <Upcomming items={top6Movie} title="Top Movies" />
            <Upcomming items={movie} title="Latest Movies" />
            <Trending />
            <Upcomming items={movie} title="Recommended Movies" />
        </>
    );
};

export default HomePage;
