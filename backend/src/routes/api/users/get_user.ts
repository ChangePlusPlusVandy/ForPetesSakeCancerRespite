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


		// let userObj = await User.findById(userIDSent);
		let userObj = await User.findOne({_id: userIDSent}).populate("newsletter");


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

		let responseJSON: any = userObj
		for(let i = 0; i < responseJSON.newsletter.length; i++){
			responseJSON.newsletter[i].name = userObj.name
			responseJSON.newsletter[i].username = userObj.username
		}

		res.status(200).json({ user: responseJSON, followingBoolean: followingBoolean });

	} catch (error) {
		console.error(error);
		throw error;
	}
}

export { getUser };