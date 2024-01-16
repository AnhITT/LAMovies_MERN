var jwt = require("jsonwebtoken");
const configs = require("../helper/configs");

module.exports = {
    checkLogin: async function (req) {
        try {
            var result = {};
            var token = req.headers.authorization;

            if (token && token.startsWith("Bearer")) {
                token = token.split(" ")[1];
            } else {
                if (req.cookies.tokenJWT) {
                    token = req.cookies.tokenJWT;
                } else {
                    throw new Error("Vui long dang nhap");
                }
            }
            var userID = await jwt.verify(token, configs.SECRET_KEY);
            return userID.id;
        } catch (error) {
            console.error("Error in checkLogin function:", error);
            throw error;
        }
    },
};
