let mongoose = require("mongoose");

let schema = mongoose.Schema({
    uniqueId: Number,
    name: String,
    qty: String,
    description: String,
    sc_id: String,
    qr_data: String,
    tx_hash: String,
});

module.exports = mongoose.model("Product", schema);
