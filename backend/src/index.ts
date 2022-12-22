const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const VerifyToken = require("./middlewares/VerifyToken");

dotenv.config();

const app = express();

const PORT: number = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/data", VerifyToken, require("./routes/dataRoute"));

app.get("/", (req, res) => { // Default route: Unprotected
    res.send("Express Auth Temp!");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});