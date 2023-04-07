import express, { Request, Response, NextFunction } from "express";
import { mongo } from "mongoose";
import {
	auth,
	getTokenFromReq,
	getFirebaseUser,
	getUserFromToken,
	getFromUserTokenAndAddIfNotFound,
} from "../../../firebase";
import VerifyToken from "../../../middlewares/VerifyToken";
import { User } from "../../../models/User";
const router = express.Router();

// add new user data to the mongoDB database
router.post(
	"/signup",
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const name = req.body.name;
			const username = req.body.username;
			const phone = req.body.phone;

			let user = await getFromUserTokenAndAddIfNotFound(getTokenFromReq(req));

			let mongoDBUser = await User.findByIdAndUpdate(
				{ _id: user._id },
				{ name, username, phone },
				{ new: true }
			);
			// mongoDBUser.name = name;
			// mongoDBUser.username = username;
			// mongoDBUser.phone = phone;

			// return the user data
			return res.json(mongoDBUser);
		} catch (e) {
			console.error(e);
			return res
				.status(401)
				.json({ message: "Unauthorized/invalid credentials" });
		}
	}
);

export default router;
