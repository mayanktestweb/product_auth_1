const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.status(200).send("App is working!");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
