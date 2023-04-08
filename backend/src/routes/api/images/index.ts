import express from "express";
import VerifyToken from "../../../middlewares/VerifyToken";
import create_image from "./create_image";
const router = express.Router();

router.get("/self", VerifyToken, (req, res) => {
	res.json((req as any).user);
});

router.use(create_image);

export default router;
