import axiosClient from '~/api/axios/axiosClient';

const END_POINT = {
    AUTH: 'authen',
    LOGIN: 'login',
    REGISTER: 'register',
    REFRESH_TOKEN: 'refreshToken',
    ME: 'me',
    LOGOUT: 'logout',
};
const GetMyInfo = () => {
    return axiosClient.get(`${END_POINT.AUTH}/${END_POINT.ME}`);
};
const Logout = () => {
    return axiosClient.get(`${END_POINT.AUTH}/${END_POINT.LOGOUT}`, { withCredentials: true });
};
export { GetMyInfo, Logout };
