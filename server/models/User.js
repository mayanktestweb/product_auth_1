let mongoose = require("mongoose");

let schema = mongoose.Schema({
    name: String,
    mobileNumber: {
        type: String,
        unique: true,
    },
});

module.exports = mongoose.model("User", schema);
