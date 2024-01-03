import axiosClient from "../api/axiosClient";

const END_POINT = {
    MOVIES: "Movie",
    THONGKE: "ThongKe",
    CreateMovie: "CreateMovie",
    ShowDetail: "ShowDetail",
};

const GetMovieAPI = () => {
    return axiosClient.get(`${END_POINT.MOVIES}`);
};
const ThongKe = () => {
    return axiosClient.get(`${END_POINT.MOVIES}/${END_POINT.THONGKE}`);
};
const DeleteMovieAPI = (id) => {
    return axiosClient.delete(`${END_POINT.MOVIES}/?id=${id}`);
};
const AddMovieAPI = (accountData) => {
    return axiosClient.post(
        `${END_POINT.MOVIES}/${END_POINT.CreateMovie}`,
        accountData,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
};
const ShowDetail = (id) => {
    return axiosClient.get(
        `${END_POINT.MOVIES}/${END_POINT.ShowDetail}/?id=${id}`
    );
};
const UpdateMovieAPI = (data) => {
    return axiosClient.patch(`${END_POINT.MOVIES}`, data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};
export {
    UpdateMovieAPI,
    ShowDetail,
    AddMovieAPI,
    DeleteMovieAPI,
    GetMovieAPI,
    ThongKe,
};
