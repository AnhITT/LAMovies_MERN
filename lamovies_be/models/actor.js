var Actor = require("../schema/actor");

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
        var limit = parseInt(query.limit) || 100;
        var page = parseInt(query.page) || 1;
        var skip = (page - 1) * limit;

        return Actor.find(search)
            .select("name avarta description")
            .sort(sort)
            .limit(limit)
            .skip(skip)
            .populate("movies")
            .exec();
    },
    getOne: function (id) {
        return Actor.findById(id).populate("movies").exec();
    },
    getByName: function (name) {
        const searchRegex = new RegExp(name, "i");
        return Actor.findOne({ name: searchRegex }).exec();
    },

    createActor: function (actor) {
        return new Actor(actor).save();
    },
    updateActor: function (id, updateData) {
        return Actor.findByIdAndUpdate(id, updateData, {
            new: true,
        })
            .populate("movies")
            .exec();
    },
    deleteActor: function (id) {
        return Actor.deleteOne({ _id: id });
    },
    getTotalActorCount: function () {
        return Actor.countDocuments().exec();
    },
};
