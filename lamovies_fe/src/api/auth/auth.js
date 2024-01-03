import axiosClient from '~/api/axios/axiosClient';
import { setAuthToken } from '../../service/auth/auth-header';

const END_POINT = {
    AUTH: 'Auth',
    LOGIN: 'login',
    REGISTER: 'register',
    REFRESH_TOKEN: 'refreshToken',
};
const AuthLogin = (username, password) => {
    return axiosClient
        .post(
            `${END_POINT.AUTH}/${END_POINT.LOGIN}`,
            {
                username,
                password,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        )
        .then((response) => {
            if (response.status === 200) {
                console.log(response.data.token);
                localStorage.setItem('token', response.data.token);
                setAuthToken(response.data.token);
                window.location.href = '/';
            } else {
                this.setState({ error: response.data.error });
                console.log(response.data.error);
            }
        })
        .catch((error) => {
            if (error.response) {
                this.setState({ error: error.response.data.error });
                console.log(error.response.data.error);
            } else {
                console.log('Error:', error.message);
            }
        });
};
export { AuthLogin };
