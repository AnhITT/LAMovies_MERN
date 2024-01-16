var express = require("express");
var router = express.Router();
var responseData = require("../helper/responseData");
var modelActor = require("../models/actor");

router.get("/", async function (req, res, next) {
    console.log(req.query);
    var actorsAll = await modelActor.getAll(req.query);
    responseData.responseReturn(res, 200, true, actorsAll);
});

router.get("/:id", async function (req, res, next) {
    try {
        var actor = await modelActor.getOne(req.params.id);
        responseData.responseReturn(res, 200, true, actor);
    } catch (error) {
        responseData.responseReturn(
            res,
            404,
            false,
            "Không tìm thấy diễn viên"
        );
    }
});

router.post("/add", async function (req, res, next) {
    var existingActor = await modelActor.getByName(req.body.name);
    if (existingActor) {
        responseData.responseReturn(res, 404, false, "Diễn viên đã tồn tại");
    } else {
        const newActor = await modelActor.createActor({
            name: req.body.name,
            avarta: req.body.avarta,
            description: req.body.description,
        });
        responseData.responseReturn(res, 200, true, newActor);
    }
});

router.put("/edit/:id", async function (req, res, next) {
    try {
        var actor = await modelActor.updateActor(req.params.id, req.body, {
            returnDocument: "after",
        });
        responseData.responseReturn(res, 200, true, actor);
    } catch (error) {
        responseData.responseReturn(
            res,
            404,
            false,
            "Không tìm thấy diễn viên"
        );
    }
});

router.delete("/delete/:id", async function (req, res, next) {
    try {
        var result = await modelActor.deleteActor(req.params.id);
        if (result.deletedCount === 1) {
            responseData.responseReturn(
                res,
                200,
                true,
                "Actor deleted successfully"
            );
        } else {
            responseData.responseReturn(res, 404, false, "Actor not found");
        }
    } catch (error) {
        responseData.responseReturn(res, 404, false, "Actor not found");
    }
});

module.exports = router;
