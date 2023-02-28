import express from "express";
import VerifyToken from "../../../middlewares/VerifyToken";
import login from "./login";
import signup from "./signup";
const router = express.Router();

router.get("/self", VerifyToken, (req, res) => {
	res.json((req as any).user);
});

router.use(login);
router.use(signup);

export default router;
