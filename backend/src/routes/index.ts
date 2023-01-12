import express from "express";
import doga from "./team/doga"

const router = express.Router();

router.get("/", async (req, res) => {
	res.send("Hello World!");
});

router.get("/team/doga", doga);

export default router;