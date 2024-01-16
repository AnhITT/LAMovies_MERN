const express = require("express");
const router = express.Router();
const modelGenre = require("../models/genre");
const responseData = require("../helper/responseData");

router.get("/", async function (req, res, next) {
    try {
        const genres = await modelGenre.getAll(req.query);
        responseData.responseReturn(res, 200, true, genres);
    } catch (error) {
        responseData.responseReturn(res, 500, false, "Internal Server Error");
    }
});

router.get("/:id", async function (req, res, next) {
    try {
        const genre = await modelGenre.getOne(req.params.id);
        responseData.responseReturn(res, 200, true, genre);
    } catch (error) {
        responseData.responseReturn(res, 404, false, "Genre not found");
    }
});

router.post("/add", async function (req, res, next) {
    try {
        const newGenre = await modelGenre.createGenre({
            name: req.body.name,
        });
        responseData.responseReturn(res, 200, true, newGenre);
    } catch (error) {
        responseData.responseReturn(res, 500, false, "Internal Server Error");
    }
});

router.put("/edit/:id", async function (req, res, next) {
    try {
        const genre = await modelGenre.updateGenre(req.params.id, req.body, {
            returnDocument: "after",
        });
        responseData.responseReturn(res, 200, true, genre);
    } catch (error) {
        responseData.responseReturn(res, 404, false, "Genre not found");
    }
});

router.delete("/delete/:id", async function (req, res, next) {
    try {
        const result = await modelGenre.deleteGenre(req.params.id);
        if (result.deletedCount === 1) {
            responseData.responseReturn(
                res,
                200,
                true,
                "Genre deleted successfully"
            );
        } else {
            responseData.responseReturn(res, 404, false, "Genre not found");
        }
    } catch (error) {
        responseData.responseReturn(res, 404, false, "Genre not found");
    }
});

module.exports = router;
