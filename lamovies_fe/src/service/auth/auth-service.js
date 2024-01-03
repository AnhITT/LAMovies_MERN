import { setAuthToken } from './auth-header.js';
import jwt from 'jwt-decode';
const logout = () => {
    localStorage.removeItem('token');
};

const getCurrentUser = () => {
    const token = localStorage.getItem('token');
    if (token) {
        const user = jwt(token);
        //  console.log(user.Username);
        return user;
    }
};

const authService = {
    logout,
    getCurrentUser,
};

export default authService;
