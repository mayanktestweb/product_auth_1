const mongoose = require("mongoose");

let schema = mongoose.Schema({
    mobileNumber: String,
    latitude: Number,
    longitude: Number,
    product_name: String,
    reason: String,
});

module.exports = mongoose.model("QRReport", schema);
