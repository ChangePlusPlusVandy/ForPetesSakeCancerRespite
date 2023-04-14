import express from "express";
import VerifyToken from "../../../middlewares/VerifyToken";
import login from "./login";
import signup from "./signup";
import search from "./search";
import add_profile_picture from "./add_profile_picture";
const router = express.Router();

router.get("/self", VerifyToken, (req, res) => {
	res.json((req as any).user);
});

router.use(login);
router.use(signup);
router.use(search);
router.use(add_profile_picture);

export default router;
