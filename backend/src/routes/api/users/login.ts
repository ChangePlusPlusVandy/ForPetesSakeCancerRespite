import express, { Request, Response, NextFunction } from "express";
import {
	auth,
	getTokenFromReq,
	getFromUserTokenAndAddIfNotFound,
} from "../../../firebase";
const router = express.Router();

// add new user data to the mongoDB database
router.post(
	"/login",
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			let user = await getFromUserTokenAndAddIfNotFound(getTokenFromReq(req));
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