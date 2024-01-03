import axiosClient from "../api/axiosClient";

const END_POINT = {
    GENRES: "Genre",
};

const GetGenreAPI = () => {
    return axiosClient.get(`${END_POINT.GENRES}`);
};
export { GetGenreAPI };
