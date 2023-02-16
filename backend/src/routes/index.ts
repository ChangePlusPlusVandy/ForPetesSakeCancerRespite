import express from "express";
import router_api from "./api";
import VerifyToken from "../middlewares/VerifyToken";

const router = express.Router();

router.get("/", async (req, res) => {
	res.send("Hello World!");
});

router.use("/api", router_api);

export default router;
