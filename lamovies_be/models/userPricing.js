const mongoose = require("mongoose");
const UserPricing = require("../schema/userPricing");

module.exports = {
    getAll: function (query) {
        var sort = {};
        var search = {};
        if (query.sort) {
            if (query.sort[0] === "-") {
                sort[query.sort.substring(1)] = "desc";
            } else {
                sort[query.sort] = "asc";
            }
        }
        if (query.key) {
            search.users = new RegExp(query.key, "i"); // hoặc search.pricings tùy thuộc vào ý định
        }
        var limit = parseInt(query.limit) || 200;
        var page = parseInt(query.page) || 1;
        var skip = (page - 1) * limit;

        return UserPricing.find(search)
            .select("startTime endTime totalAmount users pricings")
            .sort(sort)
            .limit(limit)
            .skip(skip)
            .exec();
    },

    getOne: function (id) {
        return UserPricing.findById(id).exec();
    },
    getUserPricingByUserId: function (_id) {
        return UserPricing.findOne({ users: _id }).exec();
    },
    createUserPricing: function (userPricing) {
        return new UserPricing(userPricing).save();
    },
    updateUserPricing: function (id, updateData) {
        return UserPricing.findByIdAndUpdate(id, updateData, {
            new: true,
        }).exec();
    },
    deleteUserPricing: function (id) {
        return UserPricing.findByIdAndRemove(id);
    },
    checkUserPricingByUserId: function (userId) {
        return UserPricing.findOne({ users: userId }).exec();
    },
    getTotalServiceCount: function () {
        return UserPricing.countDocuments().exec();
    },
};
