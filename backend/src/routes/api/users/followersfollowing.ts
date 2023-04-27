import { Request, Response } from "express";
import { User } from "../../../models/User";
import Newsletter from "../../../models/Newsletter"
import mongoose from "mongoose"

async function add_follower(req: Request, res: Response) {
	try {
		// Gets the User Information from Request
		const userID = req.body.id;
		const userIDINFO = await User.findById(userID);
		// Get Self Information
		const selfUser = (req as any).user;
		const selfINFO = await User.findById(selfUser._id);
		
		// Check if userID is valid
		if (!userIDINFO) {
			throw new Error("User not found");
		}
		//console.log("IndexPosition: " + selfINFO.following.indexOf(userIDINFO._id))
		// Check if user is already following
		if(selfINFO.following.indexOf(userIDINFO._id) !== -1){
			res.status(200).json({user: (userIDINFO as any).removeSensitiveData() })
			return;
		}

		// Add to person to self following
		await User.findByIdAndUpdate(
			{ _id: selfINFO._id },
			{ $push: { following: userIDINFO._id } }
		);

		// Add self to person followers NEED TO FIX
		await User.findByIdAndUpdate(
			{ _id: userIDINFO._id },
			{ $push: { follower: selfINFO._id } }
		);
		//console.log("Other User: " + userIDINFO.username)
		//console.log("SELF: " + selfUser.username)
		res.status(200).json({ message: "SUCCESS"});
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
			for(let j = 0; j < userObjFollowingPostsTemp.newsletter.length; ++j){
				userObjFollowingPostsIDS.push(userObjFollowingPostsTemp.newsletter[j])
			}
			
		}
		//console.log(userObjFollowingPostsIDS)
		const allPosts = await Newsletter.find({_id:{$in:userObjFollowingPostsIDS}}).sort({timePosted: -1})
		
		res.status(200).json(allPosts);

	} catch (error) {
		console.error(error);
		throw error;
	}
}

export { add_follower, getFeed };
