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

app.get("/", (req, res) => {
    res.status(200).send("App is working!");
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
    let { uniqueId, name, qty, description } = req.body;
    console.log(uniqueId, name, qty, description);
    let wallet = getWallet();

    try {
        let contract = new ethers.Contract(ADDRESS, ABI, wallet);
        let str_data = JSON.stringify({ uniqueId, name, qty, description });
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

let getWallet = () => {
    return ethers.Wallet.fromPhrase(process.env.PASS_PHRASE, provider);
};

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
