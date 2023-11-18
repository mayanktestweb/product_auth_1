const mongoose = require("mongoose");

let schema = mongoose.Schema({
    mobileNumber: String,
    latitude: Number,
    longitude: Number,
    reason: String,
});

module.exports = mongoose.model("QRReport", schema);
