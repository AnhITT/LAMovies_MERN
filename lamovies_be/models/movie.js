var Movie = require("../schema/movie");

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

        return Movie.find(search)
            .select(
                "name description urlTrailer urlImg urlImgCover subLanguage minAge quality time yearCreate type view episodes"
            )
            .sort(sort)
            .limit(limit)
            .skip(skip)
            .populate("actors genres")
            .exec();
    },
    getOne: function (id) {
        return Movie.findById(id)
            .populate("actors genres oddmovie seriesmovie")
            .exec();
    },
    createMovie: function (movie) {
        return new Movie(movie).save();
    },
    updateMovie: function (id, updateData) {
        return Movie.findByIdAndUpdate(id, updateData, {
            new: true,
        })
            .populate("actors genres oddmovie seriesmovie")
            .exec();
    },
    deleteMovie: function (id) {
        return Movie.deleteOne({ _id: id });
    },

    getTop6MovieView: function () {
        return Movie.find({})
            .select(
                "name description urlTrailer urlImg urlImgCover subLanguage minAge quality time yearCreate type view episodes oddMovie seriesMovies"
            )
            .sort({ view: "desc" })
            .limit(6)
            .populate("actors genres oddmovie seriesmovie")
            .exec();
    },
    getTopMovieByView: function () {
        return Movie.find({})
            .select("name view")
            .sort({ view: "desc" })
            .limit(1)
            .exec();
    },
    getTotalMoviesCount: function () {
        return Movie.countDocuments().exec();
    },

    getMoviesWithNonEmptyOddmovie: function () {
        return Movie.countDocuments({
            oddmovie: { $exists: true, $ne: null },
        }).exec();
    },

    getMoviesWithNonEmptySeriesmovie: function () {
        return Movie.countDocuments({
            seriesmovie: { $exists: true, $ne: [] },
        }).exec();
    },
};
