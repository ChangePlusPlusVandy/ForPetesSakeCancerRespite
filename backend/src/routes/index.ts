import express from "express";
import dataRoute from "./data";
import loginRoute from "./login";
import signupRoute from "./signup";
import VerifyToken from "../middlewares/VerifyToken";

const router = express.Router();

router.get("/", async (req, res) => {
	res.send("Hello World!");
});

router.use("/data", VerifyToken, dataRoute);

router.use(loginRoute);
router.use(signupRoute);

export default router;