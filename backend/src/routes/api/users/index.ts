import express from "express";
import VerifyToken from "../../../middlewares/VerifyToken";
import login from "./login";
import signup from "./signup";
import update_user from "./update_user";
import { add_follower,getFeed } from "./followersfollowing";
import {getUser} from "./get_user"
import search from "./search";
import add_profile_picture from "./add_profile_picture";
import get_profile_picture from "./get_profile_picture";
import { getUserFromSocketID } from "../../../gateway/OnlineUsersManager";
const router = express.Router();

router.get("/self", VerifyToken, (req, res) => {
	res.json((req as any).user);
});

router.post("/add_follower", VerifyToken, add_follower)
router.get("/get_user", VerifyToken, getUser)
router.get("/feed", VerifyToken, getFeed)
router.use(login);
router.use(signup);
router.use(update_user);
router.use(search);
router.use(add_profile_picture);
router.use(get_profile_picture);

export default router;
