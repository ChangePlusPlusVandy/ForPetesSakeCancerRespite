import { Request, Response } from "express";
import { User } from "../../../models/User";

// Takes a user ID and removes sensititve data
async function getUser(req: Request, res: Response) {
	try {
		// Check if user is following and add boolean for that
		let followingBoolean = false;
		const userIDSent = req.query.id;
		const self = (req as any).user;
		const selfObj = await User.findById(self._id);


		let userObj = await User.findById(userIDSent);
		if (!userObj) {
			res.status(404).json({ error: "User not found" });
			return;
		}
		// Check if user is following
		if(selfObj.following.indexOf(userObj._id) === -1 ){
			followingBoolean = false;
		} else{
			followingBoolean = true;
		}

		userObj = (userObj as any).removeSensitiveData();
		res.status(200).json({ user: userObj, followingBoolean: followingBoolean });

	} catch (error) {
		console.error(error);
		throw error;
	}
}

export { getUser };