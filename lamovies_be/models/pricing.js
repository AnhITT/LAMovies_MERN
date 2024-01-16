var Pricing = require("../schema/pricing");

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
            search.name = new RegExp(query.key, "i");
        }
        var limit = parseInt(query.limit) || 200;
        var page = parseInt(query.page) || 1;
        var skip = (page - 1) * limit;

        return Pricing.find(search)
            .select("name price time")
            .sort(sort)
            .limit(limit)
            .skip(skip)
            .exec();
    },
    getOne: function (id) {
        return Pricing.findById(id).exec();
    },
    createPricing: function (pricing) {
        return new Pricing(pricing).save();
    },
    updatePricing: function (id, updateData) {
        return Pricing.findByIdAndUpdate(id, updateData, {
            new: true,
        }).exec();
    },
    deletePricing: function (id) {
        return Pricing.deleteOne({ _id: id });
    },
};
