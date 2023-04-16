import { Request, Response } from "express";
import { User } from "../../../models/User";

// Takes a user ID and removes sensititve data
async function getUser(req: Request, res: Response) {
	try {
		const userIDSent = req.query.id;
		let userObj = await User.findById(userIDSent);
		if (!userObj) {
			res.status(404).json({ error: "User not found" });
			return;
		}
		userObj = (userObj as any).removeSensitiveData();

		res.status(200).json({ user: userObj });
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export { getUser };