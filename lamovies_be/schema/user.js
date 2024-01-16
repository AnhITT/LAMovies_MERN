var mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const configs = require("../helper/configs");

const schema = new mongoose.Schema({
    email: String,
    userName: String,
    password: String,
    fullName: String,
    dateBirthday: Date,
    role: String,
    isActive: Boolean,
    tokenForgot: String,
    tokenForgotExp: String,
});

schema.pre("save", function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
    next();
});

schema.methods.getJWT = function () {
    var token = jwt.sign(
        {
            id: this._id,
            username: this.userName,
            fullname: this.fullName,
            email: this.email,
            date: this.date,
            isActive: this.isActive,
            role: this.role,
        },
        configs.SECRET_KEY,
        {
            expiresIn: configs.EXP,
        }
    );
    return token;
};

schema.methods.addTokenForgotPassword = function () {
    var tokenForgot = crypto.randomBytes(31).toString("hex");
    this.tokenForgot = tokenForgot;
    this.tokenForgotExp = Date.now() + 15 * 60 * 1000;
    return tokenForgot;
};

schema.statics.checkLogin = async function (userName, password) {
    if (!userName || !password) {
        return { err: "Please enter your full username and password!" };
    }
    var user = await this.findOne({ userName: userName });
    if (!user) {
        return { err: "Username does not exist!" };
    }
    var result = bcrypt.compareSync(password, user.password);
    if (!result) {
        return { err: "Invalid password!" };
    }
    console.log(user);
    return user;
};
schema.statics.checkLoginAdmin = async function (userName, password) {
    if (!userName || !password) {
        return { err: "Please enter your full username and password!" };
    }
    var user = await this.findOne({ userName: userName });
    if (!user) {
        return { err: "Username does not exist!" };
    }
    var result = bcrypt.compareSync(password, user.password);
    if (!result) {
        return { err: "Invalid password!" };
    }
    if (user.role !== "admin") {
        return { err: "No Role Admin!" };
    }
    console.log(user);
    return user;
};
//JWT

module.exports = mongoose.model("user", schema);
