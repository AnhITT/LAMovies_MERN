const express = require("express");
const router = express.Router();
const responseData = require("../helper/responseData");
const movieModel = require("../models/movie");
var modelUser = require("../models/user");
var modelActor = require("../models/actor");
var modelGenre = require("../models/genre");
var modelService = require("../models/userPricing");

router.get("/", async function (req, res, next) {
    try {
        const movies = await movieModel.getAll(req.query);
        responseData.responseReturn(res, 200, true, movies);
    } catch (error) {
        responseData.responseReturn(res, 500, false, "Internal Server Error");
    }
});
router.get("/getTop6MovieView", async function (req, res, next) {
    try {
        const movies = await movieModel.getTop6MovieView(req.query);
        responseData.responseReturn(res, 200, true, movies);
    } catch (error) {
        responseData.responseReturn(res, 500, false, "Internal Server Error");
    }
});
router.get("/thongke", async function (req, res, next) {
    try {
        const data = {};
        data.countMovies = await movieModel.getTotalMoviesCount();
        data.top1View = await movieModel.getTopMovieByView();
        data.countOdd = await movieModel.getMoviesWithNonEmptyOddmovie();
        data.countSeries = await movieModel.getMoviesWithNonEmptySeriesmovie();
        data.countUsers = await modelUser.getTotalUserCount();
        data.countActors = await modelActor.getTotalActorCount();
        data.countGenres = await modelGenre.getTotalGenreCount();
        data.countService = await modelService.getTotalServiceCount();
        responseData.responseReturn(res, 200, true, data);
    } catch (error) {
        responseData.responseReturn(res, 500, false, "Internal Server Error");
    }
});
router.get("/:id", async function (req, res, next) {
    try {
        const movie = await movieModel.getOne(req.params.id);
        if (movie) {
            responseData.responseReturn(res, 200, true, movie);
        } else {
            responseData.responseReturn(res, 404, false, "Movie not found");
        }
    } catch (error) {
        responseData.responseReturn(res, 500, false, "Internal Server Error");
    }
});

router.post("/add", async function (req, res, next) {
    try {
        const newMovie = await movieModel.createMovie(req.body);
        responseData.responseReturn(res, 201, true, newMovie);
    } catch (error) {
        responseData.responseReturn(res, 500, false, "Internal Server Error");
    }
});

router.put("/edit/:id", async function (req, res, next) {
    try {
        const updatedMovie = await movieModel.updateMovie(
            req.params.id,
            req.body
        );
        if (updatedMovie) {
            responseData.responseReturn(res, 200, true, updatedMovie);
        } else {
            responseData.responseReturn(res, 404, false, "Movie not found");
        }
    } catch (error) {
        responseData.responseReturn(res, 500, false, "Internal Server Error");
    }
});

router.delete("/delete/:id", async function (req, res, next) {
    try {
        const result = await movieModel.deleteMovie(req.params.id);
        if (result.deletedCount === 1) {
            responseData.responseReturn(
                res,
                200,
                true,
                "Movie deleted successfully"
            );
        } else {
            responseData.responseReturn(res, 404, false, "Movie not found");
        }
    } catch (error) {
        responseData.responseReturn(res, 500, false, "Internal Server Error");
    }
});

module.exports = router;
