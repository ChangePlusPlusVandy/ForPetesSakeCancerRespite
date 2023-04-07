import express from "express";
import VerifyToken from "../../../middlewares/VerifyToken";
import login from "./login";
import signup from "./signup";
import { add_follower } from "./followersfollowing";
const router = express.Router();

router.get("/self", VerifyToken, (req, res) => {
	res.json((req as any).user);
});

router.post("/add_follower", VerifyToken, add_follower)

router.use(login);
router.use(signup);

export default router;
