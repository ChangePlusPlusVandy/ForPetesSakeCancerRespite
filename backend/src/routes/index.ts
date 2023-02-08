import express from "express";
import dataRoute from "./data";
import loginRoute from "./login";
import signupRoute from "./signup";
import router_api from "./api";
import VerifyToken from "../middlewares/VerifyToken";

const router = express.Router();

router.get("/", async (req, res) => {
	res.send("Hello World!");
});

router.use("/data", VerifyToken, dataRoute);

export default router;