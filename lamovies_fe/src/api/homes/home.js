import axiosClient from '~/api/axios/axiosClient';

const END_POINT = {
    MOVIES: 'Movie',
    TOP6MOVIES: 'GetTop6MovieView',
    GetURLOddMovie: 'GetURLOddMovie?id=',
    GetMovieByID: 'GetMovieById?id=',
    GetURLSeriesMovies: 'GetURLSeriesMovies?id=',
};
const GetMovieAPI = () => {
    return axiosClient.get(`${END_POINT.MOVIES}`);
};
const GetTop6MovieView = () => {
    return axiosClient.get(`${END_POINT.MOVIES}/${END_POINT.TOP6MOVIES}`);
};
const GetURLOddMovie = (id) => {
    return axiosClient.get(`${END_POINT.MOVIES}/${END_POINT.GetURLOddMovie}${id}`);
};
const GetURLSeriesMovies = (id, tap) => {
    return axiosClient.get(`${END_POINT.MOVIES}/${END_POINT.GetURLSeriesMovies}${id}&tap=${tap}`);
};
const GetMovieByID = (id) => {
    return axiosClient.get(`${END_POINT.MOVIES}/${END_POINT.GetMovieByID}${id}`);
};
export { GetURLSeriesMovies, GetMovieByID, GetURLOddMovie, GetMovieAPI, GetTop6MovieView };
