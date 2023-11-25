const express = require("express");
const app = express();

require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// connect to database
try {
    mongoose.connect(process.env.DB_URL);
    let db = mongoose.connection;
    // Check mongoDb connection
    db.once("open", function () {
        console.log("Connected to mongo db successfully");
    });
} catch (error) {
    console.log(error);
    console.log("failed to connect to db");
}

const CryptoJS = require("crypto-js");
const keccak256 = require("keccak256");
const ethers = require("ethers");
let provider = ethers.getDefaultProvider(process.env.MUMBAI_RPC_URL);

const { ADDRESS, ABI } = require("./contracts/ProductCollection");
const Product = require("./models/Product");
const QRReport = require("./models/QRReport");
const User = require("./models/User");

app.get("/", (req, res) => {
    res.status(200).send("App is working! - 2");
});

app.get("/products", async (req, res) => {
    try {
        let products = await Product.find();
        res.status(200).send(products);
    } catch (error) {
        console.log(error);
        res.status(400).send("Something went wrong!");
    }
});

app.post("/product", async (req, res) => {
    let { uniqueId, name, qty, description, batch_id, lot_id, mfg_date } =
        req.body;
    console.log(uniqueId, name, qty, description);
    let wallet = getWallet();

    try {
        let contract = new ethers.Contract(ADDRESS, ABI, wallet);
        let str_data = JSON.stringify({
            uniqueId,
            name,
            qty,
            description,
            batch_id,
            lot_id,
            mfg_date,
        });
        let key = Math.floor(Math.random() * 1000000).toString();

        let qr_data = CryptoJS.AES.encrypt(str_data, key).toString();

        let sc_id = "0x" + keccak256(qr_data).toString("hex");

        let tx = await contract.createProduct(sc_id, key);

        let tr_receipt = await tx.wait();

        let tx_hash = tr_receipt.hash;
        let prod = new Product({
            uniqueId,
            name,
            qty,
            description,
            batch_id,
            lot_id,
            mfg_date,
            sc_id,
            qr_data,
            tx_hash,
        });

        await prod.save();
        res.status(200).send("done");
    } catch (error) {
        console.log(error);
        res.status(400).send("Production failed!");
    }
});

app.post("/verify", async (req, res) => {
    try {
        let { sc_id, qrData, key } = req.body;

        let wallet = getWallet();
        let contract = new ethers.Contract(ADDRESS, ABI, wallet);

        let tx = await contract.useProduct(sc_id);
        let tx_receipt = await tx.wait();
        let bytes = CryptoJS.AES.decrypt(qrData, key);
        let objStr = bytes.toString(CryptoJS.enc.Utf8);

        res.status(200).send(JSON.parse(objStr));
    } catch (error) {
        console.log(error);
        res.status(400).send("error");
    }
});

let getWallet = () => {
    return ethers.Wallet.fromPhrase(process.env.PASS_PHRASE, provider);
};

app.get("/qr_reports", async (req, res) => {
    try {
        let reports = await QRReport.find();
        res.status(200).send(reports);
    } catch (error) {
        console.log(error);
        res.status(400).send("error");
    }
});

app.post("/qr_reports", async (req, res) => {
    let { mobileNumber, latitude, longitude, product_name, reason } = req.body;
    try {
        let report = new QRReport({
            mobileNumber,
            latitude,
            longitude,
            product_name,
            reason,
        });
        await report.save();

        res.status(200).send("done!");
    } catch (error) {
        console.log(error);
        res.status(400).send("error!");
    }
});

app.get("/user/:mobileNumber", async (req, res) => {
    let { mobileNumber } = req.params;
    try {
        let user = await User.find({ mobileNumber });
        res.status(200).send(user);
    } catch (error) {
        console.log(error);
        res.status(400).send("Failed to get User!");
    }
});

app.post("/user", async (req, res) => {
    try {
        let { name, mobileNumber } = req.body;
        let user = new User({ name, mobileNumber });
        await user.save();

        res.status(200).send("Done!");
    } catch (error) {
        console.log(error);
        res.status(400).send("Failed to save User!");
    }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
