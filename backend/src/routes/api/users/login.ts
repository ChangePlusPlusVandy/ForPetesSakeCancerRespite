import express, { Request, Response, NextFunction } from "express";
import fpscr_account from "../../../Config";
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
			if (fpscr_account) {
				const FPSCR = await User.findById(fpscr_account);
				// add this id to everyone's else following array
				
				if (FPSCR) {
					// check FPSCR it exists
					if (user.following.indexOf(FPSCR._id) !== -1) {
						await User.findByIdAndUpdate(
							{ _id: user._id },
							{ $push: { following: FPSCR._id } }
						);
					}
					if (FPSCR.follower.indexOf(user._id) !== -1) {
						await User.findByIdAndUpdate(
							{ _id: FPSCR._id },
							{ $push: { follower: user._id } }
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
