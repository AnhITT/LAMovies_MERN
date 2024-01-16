var express = require("express");
var router = express.Router();
var responseData = require("../helper/responseData");
var modelUserPricing = require("../models/userPricing");
var modelUser = require("../models/user");

router.get("/", async function (req, res, next) {
    console.log(req.query);
    var userPricingsAll = await modelUserPricing.getAll(req.query);
    responseData.responseReturn(res, 200, true, userPricingsAll);
});

router.get("/:id", async function (req, res, next) {
    try {
        var userPricing = await modelUserPricing.getOne(req.params.id);
        responseData.responseReturn(res, 200, true, userPricing);
    } catch (error) {
        responseData.responseReturn(
            res,
            404,
            false,
            "Không tìm thấy thông tin người dùng đăng ký dịch vụ"
        );
    }
});
router.get("/check/:id", async function (req, res, next) {
    try {
        var userPricing = await modelUserPricing.checkUserPricingByUserId(
            req.params.id
        );
        if (userPricing.endTime < new Date()) {
            responseData.responseReturn(res, 200, false, "Hết hạn");
        } else {
            responseData.responseReturn(res, 200, true, userPricing);
        }
    } catch (error) {
        responseData.responseReturn(res, 200, false, null);
    }
});
router.post("/add", async function (req, res, next) {
    try {
        const newUserPricing = await modelUserPricing.createUserPricing({
            users: req.body.users,
            pricings: req.body.pricings,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            totalAmount: req.body.totalAmount,
        });
        responseData.responseReturn(res, 200, true, newUserPricing);
    } catch (error) {
        responseData.responseReturn(
            res,
            500,
            false,
            "Lỗi khi thêm thông tin người dùng đăng ký dịch vụ"
        );
    }
});

router.put("/edit/:id", async function (req, res, next) {
    try {
        var userPricing = await modelUserPricing.updateUserPricing(
            req.params.id,
            req.body,
            {
                returnDocument: "after",
            }
        );
        responseData.responseReturn(res, 200, true, userPricing);
    } catch (error) {
        responseData.responseReturn(
            res,
            404,
            false,
            "Không tìm thấy thông tin người dùng đăng ký dịch vụ"
        );
    }
});

router.delete("/delete/:id", async function (req, res, next) {
    try {
        var userPricing = await modelUserPricing.deleteUserPricing(
            req.params.id
        );
        responseData.responseReturn(res, 200, true, "Xóa thành công");
    } catch (error) {
        responseData.responseReturn(
            res,
            404,
            false,
            "Không tìm thấy thông tin người dùng đăng ký dịch vụ"
        );
    }
});

module.exports = router;
