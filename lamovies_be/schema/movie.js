const mongoose = require("mongoose");
const seriesMovieSchema = new mongoose.Schema({
    practice: {
        type: Number,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
});

const oddMovieSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
});
const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    urlTrailer: {
        type: String,
        required: true,
    },
    urlImg: {
        type: String,
        required: true,
    },
    urlImgCover: {
        type: String,
        required: true,
    },
    subLanguage: {
        type: String,
        required: true,
    },
    minAge: {
        type: Number,
        required: true,
    },
    quality: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    yearCreate: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    view: {
        type: Number,
    },
    episodes: {
        type: Number,
        required: true,
    },
    actors: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Actor",
        },
    ],
    genres: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Genre",
        },
    ],
    oddmovie: oddMovieSchema,
    seriesmovie: [seriesMovieSchema],
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
