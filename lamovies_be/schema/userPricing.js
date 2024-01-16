const mongoose = require("mongoose");

const userPricingSchema = new mongoose.Schema({
    users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    pricings: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pricing",
    },
    startTime: {
        type: Date,
    },
    endTime: {
        type: Date,
    },
    totalAmount: {
        type: Number,
    },
});

const UserPricing = mongoose.model("UserPricing", userPricingSchema);

module.exports = UserPricing;
