import { Request, Response } from "express";
import { User } from "../../../models/User";
import Newsletter from "../../../models/Newsletter"
async function add_follower(req: Request, res: Response) {
	try {
		// Gets the User Information from Request
		const userID = req.body.id;
		const selfUser = (req as any).user;

		// Check if userID is valid
		const userIDINFO: any = await User.findById(userID);
		if (!userIDINFO) {
			throw new Error("User not found");
		}
		// const selfINFO = await User.findById(selfUser);
		// Check if user is already following
		for (let i = 0; i < selfUser.following; i++) {
			if (userIDINFO.following[i] == selfUser._id) {
				throw new Error("Already following");
			}
		}
		// Add to person to self following
		const selfINFO: any = await User.findById(selfUser._id);
		await selfINFO.findByIdAndUpdate(
			{ _id: selfUser._id },
			{ $push: { following: userID } }
		);
		// Add self to person followers
		await userIDINFO.findByIdAndUpdate(
			{ _id: userID },
			{ $push: { followers: selfUser._id } }
		);
		res.status(200).json({ user: userIDINFO.removeSensitiveData() });
	} catch (error) {
		console.error(error);
		throw error;
	}
}

// Takes a user ID and removes sensititve data
async function getUser(req: Request, res: Response) {
	try {
		const userIDSent = req.body.user;
		const userObj = await User.findById(userIDSent);
		if (!userObj) {
			res.status(404).json({ error: "User not found" });
			return;
		}
		(userObj as any).removeSensitiveData();

		res.status(200).json({ user: userObj });
	} catch (error) {
		console.error(error);
		throw error;
	}
}

async function getFeed(req: Request, res: Response) {
	try {
		const user = (req as any).user;
		const userObj = await User.findById(user._id);
		if (!userObj) {
			res.status(404).json({ error: "User not found" });
			return;
		}
		const userObjFollowing = userObj.following
		const userObjFollowingPostsIDS = []
		// array of newsletter ids
		for (let i = 0; i < userObjFollowing.length; i++) {
			const userObjFollowingPostsTemp = await User.findById(userObjFollowing[i])
			userObjFollowingPostsIDS.push(userObjFollowingPostsTemp.newsletter)
		}
		const allPosts = await Newsletter.find({_id:{$in:userObjFollowingPostsIDS}}).sort({timePosted: -1})
		
		res.status(200).json({ feed: allPosts });

	} catch (error) {
		console.error(error);
		throw error;
	}
}

export { add_follower, getUser, getFeed };
