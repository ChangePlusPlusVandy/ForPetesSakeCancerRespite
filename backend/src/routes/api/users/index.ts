import express from "express";
import VerifyToken from "../../../middlewares/VerifyToken";
import login from "./login";
import signup from "./signup";
import { add_follower,getFeed,getUser } from "./followersfollowing";
import search from "./search";
import { getUserFromSocketID } from "../../../gateway/OnlineUsersManager";
const router = express.Router();

router.get("/self", VerifyToken, (req, res) => {
	res.json((req as any).user);
});

router.post("/add_follower", VerifyToken, add_follower)
router.get("/getUser", VerifyToken, getUser)
router.get("/getFeed", VerifyToken, getFeed)
router.use(login);
router.use(signup);
router.use(search);

export default router;
