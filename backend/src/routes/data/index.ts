import express from "express";
const dataRoute = express.Router();

dataRoute.get("/", (req, res) => {
    res.send("Test Data Sent From Backend");
});

export default dataRoute;