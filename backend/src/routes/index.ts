import express from "express";
import dataRoute from "./data";
import router_api from "./api";
import VerifyToken from "../middlewares/VerifyToken";

const router = express.Router();

router.get("/", async (req, res) => {
	res.send("Hello World!");
});

router.use("/data", VerifyToken, dataRoute);
router.use('/api', VerifyToken, router_api);

export default router;