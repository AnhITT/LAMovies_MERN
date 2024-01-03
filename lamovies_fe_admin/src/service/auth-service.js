import jwt from "jwt-decode";

const logout = () => {
    localStorage.removeItem("token");
};

const checkRoleUser = () => {
    const token = localStorage.getItem("token");

    if (!token) {
        console.error("Token is missing");
        return false;
    }

    const decodedToken = jwt(token);
    const userRole = decodedToken.role;

    if (userRole === "admin") {
        return true;
    } else {
        console.error("User does not have admin role");
        return false;
    }
};

const getCurrentUser = () => {
    const token = localStorage.getItem("token");

    if (token) {
        const user = jwt(token);
        return user;
    }

    console.error("Token is missing");
    return null;
};

const authService = {
    checkRoleUser,
    logout,
    getCurrentUser,
};

export default authService;
