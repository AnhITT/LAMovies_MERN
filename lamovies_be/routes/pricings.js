var express = require("express");
var router = express.Router();
var responseData = require("../helper/responseData");
var modelPricing = require("../models/pricing");

router.get("/", async function (req, res, next) {
    console.log(req.query);
    var PricingsAll = await modelPricing.getAll(req.query);
    responseData.responseReturn(res, 200, true, PricingsAll);
});

router.get("/:id", async function (req, res, next) {
    try {
        var Pricing = await modelPricing.getOne(req.params.id);
        responseData.responseReturn(res, 200, true, Pricing);
    } catch (error) {
        responseData.responseReturn(res, 404, false, "Không tìm thấy dịch vụ");
    }
});

router.post("/add", async function (req, res, next) {
    const newPricing = await modelPricing.createPricing({
        name: req.body.name,
        price: req.body.price,
        time: req.body.time,
    });
    responseData.responseReturn(res, 200, true, newPricing);
});

router.put("/edit/:id", async function (req, res, next) {
    try {
        var Pricing = await modelPricing.updatePricing(
            req.params.id,
            req.body,
            {
                returnDocument: "after",
            }
        );
        responseData.responseReturn(res, 200, true, Pricing);
    } catch (error) {
        responseData.responseReturn(res, 404, false, "Không tìm thấy dịch vụ");
    }
});

router.delete("/delete/:id", async function (req, res, next) {
    try {
        var result = await modelPricing.deletePricing(req.params.id);
        if (result.deletedCount === 1) {
            responseData.responseReturn(
                res,
                200,
                true,
                "Pricings deleted successfully"
            );
        } else {
            responseData.responseReturn(res, 404, false, "Pricings not found");
        }
    } catch (error) {
        responseData.responseReturn(res, 404, false, "Không tìm thấy dịch vụ");
    }
});

module.exports = router;
