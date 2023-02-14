import express, { Request, Response, NextFunction } from "express";
import {
	auth,
	getToken,
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
			let user = await getFromUserTokenAndAddIfNotFound(getToken(req));
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
