import express from "express";
import VerifyToken from "../../../middlewares/VerifyToken";
import login from "./login";
import signup from "./signup";
import update_user from "./update_user";
import search from "./search";
const router = express.Router();

router.get("/self", VerifyToken, (req, res) => {
	res.json((req as any).user);
});

router.use(login);
router.use(signup);
router.use(update_user);
router.use(search);

export default router;
