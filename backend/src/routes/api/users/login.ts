import express, { Request, Response, NextFunction } from "express";
import CONFIG from "../../../Config";
import {
	auth,
	getTokenFromReq,
	getFromUserTokenAndAddIfNotFound,
} from "../../../firebase";
import { User } from "../../../models/User";
const router = express.Router();

// add new user data to the mongoDB database
router.post(
	"/login",
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			let user = await getFromUserTokenAndAddIfNotFound(getTokenFromReq(req));
			// follow FPSCR account
			if (CONFIG.fpscr_account) {
				//console.log(CONFIG.fpscr_account)
				const FPSCR = await User.findById(CONFIG.fpscr_account);
				const userMongoObject = await User.findById(user._id);
				// add this id to everyone's else following array
				
				if (FPSCR) {
					// check FPSCR it exists
					if (userMongoObject.following.indexOf(FPSCR._id) === -1) {
						await User.findByIdAndUpdate(
							{ _id: userMongoObject._id },
							{ $push: { following: FPSCR._id } }
						);
					}
					if (FPSCR.follower.indexOf(userMongoObject._id) === -1) {
						await User.findByIdAndUpdate(
							{ _id: FPSCR._id },
							{ $push: { follower: userMongoObject._id } }
						);
						
					}
				}
			}
			return res.json(user);
		} catch (e) {
			console.error(e);
			return res
				.status(401)
				.json({ message: "Unauthorized/invalid credentials" });
		}
	}
);

export default router;
