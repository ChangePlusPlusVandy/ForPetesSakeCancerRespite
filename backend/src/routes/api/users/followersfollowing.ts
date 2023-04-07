import { Request, Response } from "express";
import { User } from "../../../models/User";

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
		// TODO: Add Something for Information
		res.status(200).json({});
	} catch (error) {
		console.error(error);
		throw error;
	}
}

// TODO: Make a function that would return condensed public information about a user
// TODO: Make two API Endpoints for follower and following using above function
// TODO: Make a method that shows the feed of all the following people. get all posts then sort by timestamp



function getPublicUser(user){
	return {
		id: user._id,
		username: user.username,
		profilePicture: user.profilePicture,
		bio: user.bio,
		followers: user.followers,
		following: user.following,
		posts: user.posts,
		likes: user.likes,
		comments: user.comments,
	}
}

export { add_follower };
