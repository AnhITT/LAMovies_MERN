var express = require("express");
var router = express.Router();
var responseData = require("../helper/responseData");
var modelUser = require("../models/user");
var validate = require("../validates/user");
const { validationResult } = require("express-validator");

router.get("/", async function (req, res, next) {
    console.log(req.query);
    var usersAll = await modelUser.getall(req.query);
    responseData.responseReturn(res, 200, true, usersAll);
});
router.get("/:id", async function (req, res, next) {
    try {
        var user = await modelUser.getOne(req.params.id);
        responseData.responseReturn(res, 200, true, user);
    } catch (error) {
        responseData.responseReturn(res, 404, false, "khong tim thay user");
    }
});
router.post("/add", validate.validator(), async function (req, res, next) {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
        responseData.responseReturn(
            res,
            400,
            false,
            errors.array().map((error) => error.msg)
        );
        return;
    }
    var user = await modelUser.getByName(req.body.userName);
    if (user) {
        responseData.responseReturn(res, 404, false, "user da ton tai");
    } else {
        const newUser = await modelUser.createUser({
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password,
            fullName: req.body.fullName,
            dateBirthday: req.body.dateBirthday,
            role: req.body.role,
            isActive: req.body.isActive,
            pricings: [],
        });
        responseData.responseReturn(res, 200, true, newUser);
    }
});
router.put("/edit/:id", async function (req, res, next) {
    try {
        var user = await modelUser.updateUser(req.params.id, req.body, {
            returnDocument: "after",
        });
        responseData.responseReturn(res, 200, true, user);
    } catch (error) {
        responseData.responseReturn(res, 404, false, "khong tim thay user");
    }
});
router.delete("/delete/:id", async function (req, res, next) {
    //delete by Id
    try {
        var user = await modelUser.deleteUser(req.params.id);
        responseData.responseReturn(res, 200, true, "xoa thanh cong");
    } catch (error) {
        responseData.responseReturn(res, 404, false, "khong tim thay user");
    }
});

module.exports = router;
