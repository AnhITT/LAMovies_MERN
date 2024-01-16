var Genre = require("../schema/genre");

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

        return Genre.find(search)
            .select("name")
            .sort(sort)
            .limit(limit)
            .skip(skip)
            .populate("movies")
            .exec();
    },
    getOne: function (id) {
        return Genre.findById(id).populate("movies").exec();
    },
    createGenre: function (genre) {
        return new Genre(genre).save();
    },
    updateGenre: function (id, updateData) {
        return Genre.findByIdAndUpdate(id, updateData, {
            new: true,
        })
            .populate("movies")
            .exec();
    },
    deleteGenre: function (id) {
        return Genre.deleteOne({ _id: id });
    },
    getTotalGenreCount: function () {
        return Genre.countDocuments().exec();
    },
};
