var SchemaUser = require("../schema/user");

module.exports = {
    getall: function (query) {
        var sort = {};
        var Search = {};
        if (query.sort) {
            if (query.sort[0] == "-") {
                sort[query.sort.substring(1)] = "desc";
            } else {
                sort[query.sort] = "asc";
            }
        }
        if (query.key) {
            Search.userName = new RegExp(query.key, "i");
        }
        var limit = parseInt(query.limit) || 200;
        var page = parseInt(query.page) || 1;
        var skip = (page - 1) * limit;
        return SchemaUser.find(Search)
            .select("userName fullName email isActive role")
            .sort(sort)
            .limit(limit)
            .skip(skip)
            .exec();
    },
    getOne: function (id) {
        return SchemaUser.findById(id).exec();
    },
    getByName: function (name) {
        return SchemaUser.findOne({ userName: name }).exec();
    },
    createUser: function (user) {
        return new SchemaUser(user).save();
    },
    updateUser: function (id, updateData) {
        return SchemaUser.findByIdAndUpdate(id, updateData, {
            new: true,
        }).exec();
    },
    deleteUser: function (id) {
        return SchemaUser.findById(id).then((user) => {
            if (!user) {
                throw new Error("User not found");
            }

            user.isActive = !user.isActive;

            return user.save();
        });
    },
    getTotalUserCount: function () {
        return SchemaUser.countDocuments().exec();
    },
    login: function (userName, password) {
        return SchemaUser.checkLogin(userName, password);
    },
    loginadmin: function (userName, password) {
        return SchemaUser.checkLoginAdmin(userName, password);
    },
    getByEmail: function (email) {
        return SchemaUser.findOne({ email: email }).exec();
    },
    getByTokenForgot: function (token) {
        return SchemaUser.findOne({
            tokenForgot: token,
            tokenForgotExp: { $gte: Date.now() },
        }).exec();
    },
};
